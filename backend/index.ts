import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv"
import path from 'path';

import userRouters from "./routers/userRouters"
import chatRouter from "./routers/chatRouter";
import messageRouter from "./routers/messageRouter";

import errorMiddleware from './middlewares/error';
import mongodb from './config/mongodb';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config({ path: path.resolve(path.join(__dirname, "./config/.env")) })
mongodb();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/v1/user", userRouters)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/message", messageRouter)

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Invalid API Endpoint"
  });
})

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});