import type { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";

import ErrorHandler from "../utils/errorHandler";
import User from "../models/userModel";
import sendToken from "../utils/sendToken";
import getGoogleClient from "../config/googleClient";

const registerUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create({ name, email, password });

  sendToken(res, user, 201);
});


const loginUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");


  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if (user.provider === "google") {
    return next(new ErrorHandler(`Please login using Google`, 400));
  }

  if (!(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(res, user, 200);
});

const loadUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  sendToken(res, user, 200);
});

const loginWithGoogle = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = getGoogleClient();

  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    return next(new ErrorHandler("Invalid Google token", 400));
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    return next(new ErrorHandler("User not registered", 404));
  }

  if (user.provider === "local") {
    return next(new ErrorHandler(`Please login using email and password`, 400));
  }

  sendToken(res, user, 200);
});

const registerWithGoogle = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = getGoogleClient();
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    return next(new ErrorHandler("Invalid Google token", 400));
  }

  let user = await User.findOne({ email: payload.email });

  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }

  user = await User.create({
    name: payload.name,
    email: payload.email,
    provider: "google",
  });

  sendToken(res, user, 201);
});

export { registerUser, loginUser, loadUser, loginWithGoogle, registerWithGoogle };