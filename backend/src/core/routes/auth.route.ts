import { Router } from "express";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
import { loginController, logoutController, refreshTokenController } from "@/core/controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.post("/logout", authenticate, logoutController);

export default authRouter;