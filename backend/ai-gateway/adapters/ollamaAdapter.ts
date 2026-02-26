import axios from "axios";

export class OllamaAdapter {
  async chat(messages: any[], model: string, res: any) {
    try {
      // Convert messages array to prompt (simple format)
      const prompt = messages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");

      const response = await axios.post(
        //"http://localhost:11434/api/generate",
        `${process.env.OLLAMA_URL}/api/generate`,
        {
          model: model,
          prompt: prompt,
          stream: true
        },
        { responseType: "stream" }
      );

      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");

      response.data.on("data", (chunk: Buffer) => {
        const lines = chunk.toString().split("\n");

        for (const line of lines) {
          if (!line) continue;

          const parsed = JSON.parse(line);

          if (parsed.response) {
            res.write(parsed.response);
          }
        }
      });

      response.data.on("end", () => {
        res.end();
      });

    } catch (error) {
      console.error("Ollama Adapter Error:", error);
      res.status(500).json({ error: "LLM request failed" });
    }
  }
}
