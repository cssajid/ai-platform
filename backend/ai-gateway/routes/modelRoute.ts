import { Router } from "express";

const router = Router();

router.get("/models", (req, res) => {
  res.json([
    { id: "llama3.2:latest", name: "Llama 3.2" },
    { id: "gemma3:270m", name: "Gemma 3 (Lightweight)" }
  ]);
});

export default router;
