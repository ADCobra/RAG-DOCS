import type { Request, NextFunction } from 'express';
import Chat from '../models/chatModels';
import Message from '../models/MessageModel';
import ErrorHandler from './errorHandler';


const askQuestion = async (req: Request, next: NextFunction, chatId: string, question: string) => {

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

  const AIResponse = await fetch('http://localhost:8000/api/v1/message/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chat._id,
      question,
    }),
  });

  if (AIResponse.status !== 200) {
    return next(new ErrorHandler("Failed to get response from AI service", 500));
  }

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

  chat.lastMessageAt = new Date();
  chat.messageCount += 1;
  await chat.save();

  return { message, aiMessage };
};

export default askQuestion;