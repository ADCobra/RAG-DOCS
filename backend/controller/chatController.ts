import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModels";
import ErrorHandler from "../utils/errorHandler";
import type { Request, Response, NextFunction } from "express";
import Message from "../models/MessageModel";

const createChat = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  if (!title) {
    return next(new ErrorHandler("Title is required", 400));
  }

  if (!req.files) {
    return next(new ErrorHandler("At least one document is required", 400));
  }

  if (!Array.isArray(req.files) || req.files.length === 0) {
    return next(new ErrorHandler("At least one document is required", 400));
  }

  const form = new FormData();
  req.files.forEach((file: Express.Multer.File) => {
    const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype });
    form.append('files', blob, file.originalname);
  });

  const chat = await Chat.create({
    userId: req.user!._id,
    title,
    lastMessageAt: new Date(),
    documents: req.files.map((file: Express.Multer.File) => ({ name: file.originalname })),
  });

  form.append('chat_id', chat._id.toString());
  form.append('user_id', req.user!._id.toString());

  const responses = await fetch(`${process.env.FASTAPI_URL}/api/v1/documents/upload`, {
    method: 'POST',
    body: form,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.FASTAPI_KEY}`,
    }
  });

  if (!responses.ok) {
    await Chat.findByIdAndDelete(chat._id)
    return next(new ErrorHandler("Failed to upload documents", 500));
  }

  let data;
  try {
    data = await responses.json();
  } catch (error) {
    await Chat.findByIdAndDelete(chat._id)
    return next(new ErrorHandler("Invalid response from server", 500));
  }

  if (data.success === false) {
    await Chat.findByIdAndDelete(chat._id)
    return next(new ErrorHandler("Failed to upload documents", 500));
  }

  res.status(201).json({
    success: true,
    chat,
  });
});

const getAllChats = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const chats = await Chat.find({ userId: req.user!._id, isDeleted: false }).sort({ lastMessageAt: -1 });
  if (!chats || chats.length === 0) {
    return next(new ErrorHandler("No chats found", 404));
  }

  res.status(200).json({ success: true, chats });
});

const getChatById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const chatId = req.params.id;
  const chat = await Chat.findOne({ _id: chatId, userId: req.user!._id, isDeleted: false });
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  const messages = await Message.find({ chatId: chat._id }).sort({ createdAt: 1 });

  res.status(200).json({ success: true, chat, messages });
});

const deleteChat = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const chatId = req.params.id;
  const chat = await Chat.findOne({ _id: chatId, userId: req.user!._id, isDeleted: false });

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  const responses = await fetch(`${process.env.FASTAPI_URL}/api/v1/documents/delete/${chat._id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.FASTAPI_KEY}`,
    }
  });

  if (!responses.ok) {
    return next(new ErrorHandler("Failed to delete documents", 500));
  }

  chat.isDeleted = true;
  await chat.save();

  let data;
  try {
    data = await responses.json();
  } catch (error) {
    return next(new ErrorHandler("Invalid response from server", 500));
  }

  if (data.success === false) {
    return next(new ErrorHandler("Failed to delete documents", 500));
  }

  res.status(200).json({ success: true, message: "Chat deleted successfully" });
});

const deleteAllChat = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const responses = await fetch(`${process.env.FASTAPI_URL}/api/v1/documents/user-delete/${req.user._id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.FASTAPI_KEY}`,
    }
  });

  if (!responses.ok) {
    return next(new ErrorHandler("Failed to delete documents", 500));
  }

  let data;

  try {
    data = await responses.json();
  } catch (error) {
    return next(new ErrorHandler("Invalid response from server", 500));
  }

  if (data.success === false) {
    return next(new ErrorHandler("Failed to delete chats", 500));
  }

  const chats = await Chat.updateMany({ userId: req.user._id, isDeleted: false }, { isDeleted: true })

  res.status(200).json({ success: true, message: "Chat deleted successfully" });
});

const changeChatName = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const chatId = req.params.id;
  const { newName } = req.body;

  const chat = await Chat.findOne({ _id: chatId, userId: req.user!._id, isDeleted: false });
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  chat.title = newName || chat.title;
  await chat.save();

  res.status(200).json({ success: true, chat });
});

export { createChat, getAllChats, getChatById, deleteChat, deleteAllChat, changeChatName };