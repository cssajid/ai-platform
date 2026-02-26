import { Router } from "express";
import { handleChat } from "../services/aiService";

const router = Router();

router.post("/chat", async (req, res) => {
  const { messages, model } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    await handleChat(messages, model, res);
    console.log("Selected Model:", model);
  } catch (error) {
    console.error("Chat route error:", error);
    res.status(500).json({ error: "LLM request failed" });
  }
});

export default router;
