import type { CookieOptions } from "express";
import type { Response } from "express";

export const setCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // True jika pakai HTTPS
  sameSite: "lax",
  path: "/",
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("accessToken", setCookieOptions);
  res.clearCookie("refreshToken", setCookieOptions);
};
