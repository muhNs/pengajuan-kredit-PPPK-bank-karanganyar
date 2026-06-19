import { Request, Response } from "express";
import * as masterService from "../services/general-master.service.js";
import { masterDataSchema } from "../schemas/general-master.schema.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const kategori = req.params.kategori as string;
    const data = await masterService.getAllData(kategori);
    res.status(200).json({ message: "Berhasil mengambil data", data });
  } catch (error: any) {
    res.status(404).json({ error: error.message || "Gagal mengambil data" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const kategori = req.params.kategori as string;
    
    // Validasi input dengan Zod
    const validatedData = masterDataSchema.parse(req.body);
    
    const newData = await masterService.createData(kategori, validatedData);
    res.status(201).json({ message: "Data berhasil ditambahkan", data: newData });
  } catch (error: any) {
    // Tangkap error Zod dan format menjadi array error
    if (error.name === "ZodError") {
      return res.status(400).json({ error: JSON.stringify(error.errors) });
    }
    res.status(500).json({ error: "Gagal menambahkan data server" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const kategori = req.params.kategori as string;
    const id = Number(req.params.id);
    const validatedData = masterDataSchema.parse(req.body);

    const updatedData = await masterService.updateData(kategori, id, validatedData);
    res.status(200).json({ message: "Data berhasil diperbarui", data: updatedData });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: JSON.stringify(error.errors) });
    }
    res.status(500).json({ error: "Gagal memperbarui data" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const kategori = req.params.kategori as string;
    const id = Number(req.params.id);
    await masterService.deleteData(kategori, id);
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error: any) {
    res.status(500).json({ error: "Gagal menghapus data" });
  }
};