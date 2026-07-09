import { Router } from "express";

import { registerUser, loginUser, loadUser } from "../controller/userController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/me", authMiddleware, loadUser)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router