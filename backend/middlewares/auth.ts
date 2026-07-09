import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import ErrorHandler from "../utils/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || "";
  if (!token) {
    return next(new ErrorHandler("Unauthorized: No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new ErrorHandler("Unauthorized: User not found", 401));
    }

    req.user = user;
    next();
  }
  catch (error) {
    return next(new ErrorHandler("Unauthorized: Invalid token", 401));
  }
};


export { authMiddleware };