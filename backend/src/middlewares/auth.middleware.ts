import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/auth.utils.js";
import { AppJwtPayload } from "@/types/jwt.types.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    const decoded = verifyToken(token) as AppJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token tidak valid" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };
};
