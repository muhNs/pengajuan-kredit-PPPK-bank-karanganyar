import { prisma } from "@/lib/prisma.js";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth.utils.js";
import bcrypt from "bcrypt";

export const register = async (email: string, password: string) => {}
export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Email tidak ditemukan");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Password salah");
    }
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = await generateRefreshToken({ id: user.id });
    return { accessToken, refreshToken };
};
export const refreshToken = async (refreshToken: string) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: { refreshToken },
        include: { user: true },
    });
    if (!storedToken) {
        throw new Error("Invalid refresh token");
    }
    const accessToken = generateAccessToken({ id: storedToken.user.id, role: storedToken.user.role });
    return { accessToken: accessToken };
};

export const logout = async (refreshToken: string) => {
    await prisma.refreshToken.update({
        where: { refreshToken },
        data: { deleted_at: new Date() }
    });
};