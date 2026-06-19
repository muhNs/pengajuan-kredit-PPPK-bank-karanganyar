import express, { Router } from "express";
import authRouter from "@/core/routes/auth.route.js";
import userRouter from "@/core/routes/user.route.js";
import masterRouter from "@/core/routes/general-master.route.js";
import instansiRouter from "@/core/routes/instansi-master.route.js";
import pengajuanRouter from "@/core/routes/pengajuan.route.js";

const v1Router: Router = express.Router();
v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/master", masterRouter);
v1Router.use("/instansi", instansiRouter);
v1Router.use("/pengajuan", pengajuanRouter);

export default v1Router;
