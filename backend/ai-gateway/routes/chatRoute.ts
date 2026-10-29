import { Router } from "express";
import { handleChat } from "../services/aiService";

const router = Router();

router.post("/chat", async (req, res) => {

  const { messages, model } = req.body;

  // Validate request
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: "Invalid messages format"
    });
  }

  try {

    console.log("Selected Model:", model);

    await handleChat(messages, model, res);

  } catch (error) {

    console.error("Chat route error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "LLM request failed"
      });
    }
  }
});

export default router;