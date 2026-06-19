import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import v1Router from "@/routes/v1/routes.js";

dotenv.config();

const app = express();
const allowedOriginsRaw =
  process.env.ALLOWED_ORIGINS ??
  process.env.ALLOWED_CORS ??
  process.env.allowedCors ??
  "";
const allowedOrigins = allowedOriginsRaw
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", v1Router);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads")),
);

// 5. Global Error Handler (Sangat Penting agar server tidak crash dan mereturn HTML error ke Axios)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server internal",
  });
});

app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});
