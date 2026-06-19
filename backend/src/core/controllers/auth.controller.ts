import { clearAuthCookie, setCookieOptions } from "@/utils/cookie.js";
import { login, logout, refreshToken } from "@/core/services/auth.service.js";
import type { Request, Response } from "express";
import { loginSchema } from "../schemas/auth.schema.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const user = loginSchema.parse(req.body);
    const result = await login(user.email, user.password);

    res.cookie("accessToken", result.accessToken, {
      ...setCookieOptions,
      maxAge: 15 * 60 * 1000,
    }); // Access token berlaku selama 15 menit
    res.cookie("refreshToken", result.refreshToken, {
      ...setCookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // Refresh token berlaku selama 7 hari

    res.json({ message: "Login berhasil", data: result });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Login gagal" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    let refreshToken: string | undefined;
    if (req.cookies.refreshToken) {
      refreshToken = req.cookies.refreshToken;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      refreshToken = req.headers.authorization.split(" ")[1]; // Menghilangkan "Bearer " dari header
    }

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token tidak ditemukan" });
    }

    clearAuthCookie(res);

    await logout(refreshToken);
    res.json({ message: "Logout berhasil" });
  } catch (error) {
    res
      .status(401)
      .json({ error: error instanceof Error ? error.message : "Logout gagal" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    let Token: string | undefined;
    if (req.cookies.refreshToken) {
      Token = req.cookies.refreshToken as string;
    }

    if (!Token) {
      return res.status(400).json({ error: "Refresh token tidak ditemukan" });
    }

    const result = await refreshToken(Token);
    res.cookie("accessToken", result.accessToken, {
      ...setCookieOptions,
      maxAge: 1 * 60 * 1000, // 15 Menit (sesuaikan dengan umur token)
    });

    res.json({ message: "Token berhasil diperbarui" });
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : "Gagal refresh token",
    });
  }
};
