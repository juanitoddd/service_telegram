import { Request, Response, Router } from "express";
import bot from "../controllers/telegram";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ service: "service [telegram] is active" });
});

router.get("/bot", async (req: Request, res: Response) => {
  res.json({ service: "bot is active" });
});

export default router;
