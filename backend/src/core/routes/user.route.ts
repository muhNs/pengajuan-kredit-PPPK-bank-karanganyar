import { Router } from "express";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
import { getProfile, createUserController, getAllUserController, updateUserController, deleteUserController } from "@/core/controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", authenticate, authorize(["ADMIN", "CS"]), getProfile);

userRouter.post("/createUser", authenticate, authorize(["ADMIN"]), createUserController);
userRouter.get("/getAllUsers", authenticate, authorize(["ADMIN"]), getAllUserController);
userRouter.put("/updateUser/:id", authenticate, authorize(["ADMIN"]), updateUserController);
userRouter.delete("/deleteUser/:id", authenticate, authorize(["ADMIN"]), deleteUserController);

export default userRouter;