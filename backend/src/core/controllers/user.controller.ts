import type { Request, Response } from "express";
import {
  createUserSchema,
  updateUserSchema,
} from "@/core/schemas/user.schema.js";
import {
  getProfileService,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
} from "@/core/services/user.service.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Sesi tidak valid atau token tidak ditemukan" });
    }

    const userProfile = await getProfileService(userId);
    res.status(200).json(userProfile);
  } catch (error: any) {
    res
      .status(404)
      .json({ error: error.message || "Gagal mengambil profil pengguna" });
  }
};

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res
      .status(200)
      .json({ message: "Berhasil mengambil data pengguna", data: users });
  } catch (error: any) {
    res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const newUser = await createUser(validatedData);

    res
      .status(201)
      .json({ message: "Pengguna berhasil ditambahkan", data: newUser });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: JSON.stringify(error.errors) });
    }
    res
      .status(400)
      .json({ error: error.message || "Gagal menambahkan pengguna" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validatedData = updateUserSchema.parse(req.body);

    const updatedUser = await updateUser(id, validatedData);
    res
      .status(200)
      .json({ message: "Pengguna berhasil diperbarui", data: updatedUser });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: JSON.stringify(error.errors) });
    }
    res
      .status(400)
      .json({ error: error.message || "Gagal memperbarui pengguna" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteUser(id);
    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (error: any) {
    res.status(500).json({ error: "Gagal menghapus pengguna" });
  }
};
