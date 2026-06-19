import { Request, Response } from "express";
import {
  createInstansi,
  getAllInstansi,
  getInstansiById,
  updateInstansi,
  deleteInstansi,
} from "@/core/services/instansi-master.service.js";
import {
  instansiSchema,
  updateInstansiSchema,
} from "@/core/schemas/instansi-master.schema.js";

export const getAllInstansiController = async (req: Request, res: Response) => {
  try {
    const instansiList = await getAllInstansi();
    res.status(200).json(instansiList);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data instansi" });
  }
};

export const getInstansiByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const instansi = await getInstansiById(Number(id));

    res.status(200).json(instansi);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data instansi" });
  }
};

export const createInstansiController = async (req: Request, res: Response) => {
  try {
    const validatedInput = instansiSchema.parse(req.body);
    const newInstansi = await createInstansi(validatedInput);
    res.status(201).json(newInstansi);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat data instansi" });
  }
};

export const updateInstansiController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const validatedInput = updateInstansiSchema.parse(req.body);
    const updatedInstansi = await updateInstansi(Number(id), validatedInput);
    res.status(200).json(updatedInstansi);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate data instansi" });
  }
};

export const deleteInstansiController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID instansi tidak valid" });
    }
    await deleteInstansi(Number(id));
    res.status(200).json({ message: "Data instansi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus data instansi" });
  }
};
