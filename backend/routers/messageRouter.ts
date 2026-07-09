import { Router } from "express";
import { newQuestionAsked } from "../controller/messageController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/ask", newQuestionAsked);

export default router;