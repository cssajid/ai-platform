import { tools } from "../tools/toolRegistry";
import { OllamaAdapter } from "../adapters/ollamaAdapter";

const adapter = new OllamaAdapter();

export async function handleChat(
  messages: any[],
  model: string,
  res: any
) {

  messages.unshift({
  role: "system",
  content: `
You are an HR assistant.

IMPORTANT RULES:
- If a user asks about leave balance, ALWAYS call the tool "getLeaveBalance".
- Never guess employee leave information.
- Only respond using tool results.

Tools available:
1. getLeaveBalance(employeeId)
2. getEmployeeInfo(employeeId)
`
});
  const selectedModel = model || "llama3.2:latest";

  // First call to LLM
  const response = await adapter.chat(messages, selectedModel);
  console.log("LLM raw response:", response);
  // Check if LLM wants to call a tool
  if (response?.tool_calls?.length) {

  const toolCall = response.tool_calls[0];

  console.log("Full toolCall:", JSON.stringify(toolCall, null, 2));

  const toolName = toolCall.function?.name || toolCall.name;

  let toolArgs = toolCall.function?.arguments || toolCall.arguments;

  if (typeof toolArgs === "string") {
    toolArgs = JSON.parse(toolArgs);
  }

  console.log("Tool requested:", toolName);
  console.log("Tool arguments:", toolArgs);

  const tool = tools[toolName];

  if (!tool) {
    throw new Error(`Tool ${toolName} not found`);
  }

  const toolResult = await tool(toolArgs);

  messages.push({
    role: "tool",
    content: JSON.stringify(toolResult)
  });

  await adapter.chat(messages, selectedModel, res);

  return;
}

  // If no tool call, stream normally
  await adapter.chat(messages, selectedModel, res);
}