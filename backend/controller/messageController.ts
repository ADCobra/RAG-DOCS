import expressAsyncHandler from "express-async-handler";
import type { Request, Response, NextFunction } from "express";
import Chat from "../models/chatModels";
import ErrorHandler from "../utils/errorHandler";
import Message from "../models/MessageModel";


const newQuestionAsked = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { chatId, question } = req.body;

  const reqT1 = Date.now();
  console.log(reqT1);
  if (!chatId || !question) {
    return next(new ErrorHandler("Chat ID and question are required", 400));
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  const message = await Message.create({
    chatId: chat._id,
    userId: req.user!._id,
    content: question,
    role: 'user',
  });

  const reqT2 = Date.now();
  console.log(reqT2);
  console.log(`Time taken to create user message: ${reqT2 - reqT1} ms`);

  const AIResponse = await fetch(`${process.env.FASTAPI_URL}/api/v1/message/ask`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.FASTAPI_KEY}`,
    },
    body: JSON.stringify({
      chat_id: chat._id,
      user_id: req.user!._id.toString(),
      question,
    }),
  });

  console.log(AIResponse)

  if (AIResponse.status !== 200) {
    return next(new ErrorHandler("Failed to get response from AI service", 500));
  }

  if (!AIResponse.ok) {
    return next(new ErrorHandler("AI service returned an error", 500));
  }

  const reqT3 = Date.now();
  console.log(reqT3);
  console.log(`Time taken to get AI response: ${reqT3 - reqT2} ms`);

  const aiData = await AIResponse.json();


  const aiMessage = await Message.create({
    chatId: chat._id,
    userId: req.user!._id,
    content: aiData.answer,
    role: 'assistant',
    metadata: {
      sources: aiData.source_documents || [],
    },
  });

  const reqT4 = Date.now();
  console.log(reqT4);
  console.log(`Time taken to create AI message: ${reqT4 - reqT3} ms`);


  chat.lastMessageAt = new Date();
  chat.messageCount += 1;
  await chat.save();
  console.log(`Total time for askQuestion: ${reqT4 - reqT1} ms`);

  res.status(200).json({
    success: true,
    userMessage: message,
    aiMessage: aiMessage,
  });
});

export { newQuestionAsked };