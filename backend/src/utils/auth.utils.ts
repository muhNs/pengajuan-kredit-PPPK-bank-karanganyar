import { prisma } from "@/lib/prisma.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (user: { id: number; role: string }) => {
  return jwt.sign(
    { user_id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );
};

export const generateRefreshToken = async (user: { id: number }) => {
  const refreshToken = crypto.randomBytes(64).toString("hex");

  await prisma.refreshToken.create({
    data: {
      refreshToken,
      user_id: user.id,
      exp_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return refreshToken;
};

export const verifyToken = (token: string, refreshToken?: string) => {
  return jwt.verify(token, refreshToken || process.env.JWT_SECRET!);
};