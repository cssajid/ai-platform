import axios from "axios";
import { toolDefinitions } from "../tools/toolRegistry";

export class OllamaAdapter {

  async chat(messages: any[], model: string, res?: any) {

    try {

      const response = await axios.post(
        `${process.env.OLLAMA_URL}/api/chat`,
        {
          model: model,
          messages: messages,
          tools: toolDefinitions,
          // stream only when res exists
          stream: !!res
        },
        {
          responseType: res ? "stream" : "json"
        }
      );

      // =========================================
      // MODE 1 → Tool detection (no streaming)
      // =========================================
      if (!res) {
        return response.data.message;
      }

      // =========================================
      // MODE 2 → Streaming response
      // =========================================

      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");

      response.data.on("data", (chunk: Buffer) => {

        const lines = chunk.toString().split("\n");

        for (const line of lines) {

          if (!line) continue;

          const parsed = JSON.parse(line);

          if (parsed.message?.content) {
            res.write(parsed.message.content);
          }
        }

      });

      response.data.on("end", () => {
        res.end();
      });

    } catch (error: any) {

      console.error("Ollama Adapter Error:");

      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }

      if (res) {
        res.status(500).json({
          error: error.message
        });
      }

    }
  }

}