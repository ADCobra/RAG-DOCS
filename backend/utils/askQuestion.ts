import type { Request, NextFunction } from 'express';
import Chat from '../models/chatModels';
import Message from '../models/MessageModel';
import ErrorHandler from './errorHandler';


const askQuestion = async (req: Request, next: NextFunction, chatId: string, question: string) => {
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

  return { message, aiMessage };
};

export default askQuestion;