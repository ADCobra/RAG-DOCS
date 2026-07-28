import type { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

const sendToken = async (res: Response, user: IUser, statusCode: number) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string || "", {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60,
  });

  // In production the frontend and API sit on different domains, so the cookie
  // must be SameSite=None (which browsers only accept alongside Secure).
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
  }).json({
    success: true,
    user,
    token,
  });
}

export default sendToken;