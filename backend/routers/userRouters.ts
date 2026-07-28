import { Router } from "express";

import { registerUser, loginUser, loadUser, loginWithGoogle, registerWithGoogle, logoutUser } from "../controller/userController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/me", authMiddleware, loadUser)
router.post("/register", registerUser);
router.put("/logout", authMiddleware, logoutUser)
router.post("/login", loginUser);
router.post("/google/register", registerWithGoogle);
router.post("/google/login", loginWithGoogle);

export default router