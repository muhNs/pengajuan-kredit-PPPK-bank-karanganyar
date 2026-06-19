import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcrypt";
import {
  CreateUserInput,
  UpdateUserInput,
} from "@/core/schemas/user.schema.js";

// Helper agar query database TIDAK mengembalikan password
const userSelectFields = {
  id: true,
  username: true,
  email: true,
  role: true,
};

export const getProfileService = async (userId: number) => {
  // Cari user berdasarkan ID
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    // Gunakan 'select' agar field password TIDAK ikut terbaca dari database
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Pengguna tidak ditemukan");
  }

  return user;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: userSelectFields,
    orderBy: { id: "desc" },
  });
};

export const createUser = async (data: CreateUserInput) => {
  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) throw new Error("Email sudah terdaftar digunakan");

  // Hash password dengan saltRounds = 10
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      role: data.role,
      password: hashedPassword, // Simpan password yang sudah diacak
    },
    select: userSelectFields,
  });
};

export const updateUser = async (id: number, data: UpdateUserInput) => {
  // Jika email diganti, cek apakah email baru sudah dipakai orang lain
  if (data.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser && existingUser.id !== id) {
      throw new Error("Email sudah digunakan oleh pengguna lain");
    }
  }

  // Siapkan objek update
  const updateData: any = { ...data };

  // Jika user mengirimkan password baru, hash lagi
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelectFields, // Tetap sembunyikan password saat direturn
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
