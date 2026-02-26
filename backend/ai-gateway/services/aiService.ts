import { OllamaAdapter } from "../adapters/ollamaAdapter";

const adapter = new OllamaAdapter();

export async function handleChat(
  messages: any[],
  model: string,
  res: any
) {
  const selectedModel = model || "llama3.2:latest"; // fallback

  await adapter.chat(messages, selectedModel, res);
}
