import expressAsyncHandler from "express-async-handler";
import type { Request, Response, NextFunction } from "express";
import Chat from "../models/chatModels";
import askQuestion from "../utils/askQuestion";
import ErrorHandler from "../utils/errorHandler";


const newQuestionAsked = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { chatId, question } = req.body;

  const askQ = await askQuestion(req, next, chatId, question);

  if (!askQ) {
    return next(new ErrorHandler("Failed to process the question", 500));
  }

  res.status(200).json({
    success: true,
    userMessage: askQ.message,
    aiMessage: askQ.aiMessage,
  });
});

export { newQuestionAsked };