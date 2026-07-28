import Router from "express";
import { createChat, getAllChats, getChatById, deleteChat, changeChatName, deleteAllChat } from "../controller/chatController";
import upload from "../config/multer";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", upload.array("documents"), createChat);
router.get("/", getAllChats);
router.post("/change-name/:id", changeChatName);
router.put("/delete-all", deleteAllChat);
router.get("/:id", getChatById);
router.delete("/:id", deleteChat);

export default router;
