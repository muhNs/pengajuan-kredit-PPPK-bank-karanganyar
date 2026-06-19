import { Request, Response } from "express";
import * as pengajuanService from "../services/pengajuan.service.js";
import {
  createPengajuanSchema,
  pengajuanIdParamSchema,
  updatePengajuanSchema,
  documentTypeSchema,
} from "../schemas/pengajuan.schema.js";
import { getQueryParamsSchema } from "../schemas/pengajuan.schema.js";
import { prisma } from "@/lib/prisma.js";
import { z } from "zod";

// Fungsi controller disimpan ke dalam variabel
export const getListPengajuanAdmin = async (req: Request, res: Response) => {
  try {
    // Validasi query request menggunakan Zod
    const query = getQueryParamsSchema.parse(req.query);

    // Panggil fungsi service variabel
    const result = await pengajuanService.getAllPagination(
      query.page,
      query.limit,
      query.search,
    );

    return res.status(200).json({
      message: "Berhasil mengambil daftar pengajuan kredit",
      metadata: result.metadata,
      data: result.data,
    });
  } catch (error: any) {
    console.error("Error Get List Pengajuan Admin:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({ error: error.errors });
    }

    return res
      .status(500)
      .json({ error: "Terjadi kesalahan pada server saat memuat list tabel." });
  }
};

export const createPengajuanController = async (
  req: Request,
  res: Response,
) => {
  try {
    // 1. Validasi Input Teks menggunakan Zod
    const validatedData = createPengajuanSchema.parse(req.body);
    const files = (req as any).files;
    // 2. Pastikan file ada (minimal beberapa file wajib harusnya ada)
    if (!files || Object.keys(files).length === 0) {
      return res
        .status(400)
        .json({ error: "Berkas pendukung wajib diupload." });
    }

    // 3. Panggil Service
    const pengajuan = await pengajuanService.createPengajuan(
      validatedData,
      files,
    );

    res.status(201).json({
      message: "Formulir pengajuan kredit berhasil dikirim.",
      data: pengajuan,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      // Tangkap error validasi form
      return res.status(400).json({ error: JSON.parse(error.message) });
    }
    console.error("Gagal membuat pengajuan:", error);
    res
      .status(500)
      .json({ error: error.message || "Terjadi kesalahan pada server." });
  }
};

// Fungsi controller detail disimpan ke dalam variabel
export const getDetailPengajuanAdmin = async (req: Request, res: Response) => {
  try {
    // 1. Validasi parameter ID yang dikirim dari URL (req.params) menggunakan Zod
    const { id } = pengajuanIdParamSchema.parse(req.params);

    // 2. Ambil data melalui variabel fungsi service
    const pengajuan = await pengajuanService.getDetailById(id);

    // 3. Jika data tidak ditemukan di database
    if (!pengajuan) {
      return res.status(404).json({
        error: "Data pengajuan kredit tidak ditemukan atau sudah dihapus.",
      });
    }

    // 4. Kembalikan Response Sukses 200 beserta data super lengkap
    return res.status(200).json({
      message: "Berhasil mengambil detail data pengajuan kredit",
      data: pengajuan,
    });
  } catch (error: any) {
    console.error("Error Get Detail Pengajuan Admin:", error);

    // Jika error akibat format ID dari URL salah (bukan angka murni)
    if (error.name === "ZodError") {
      return res
        .status(400)
        .json({ error: error.errors[0]?.message || "Parameter tidak valid" });
    }

    return res.status(500).json({
      error: "Terjadi kesalahan pada server saat memuat detail pengajuan.",
    });
  }
};

export const updatePengajuanAdmin = async (req: Request, res: Response) => {
  try {
    // 1. Validasi parameter ID dari URL menggunakan Zod
    const { id } = pengajuanIdParamSchema.parse(req.params);

    // 2. Validasi body data yang dikirim frontend menggunakan skema partial Zod
    const validatedBody = updatePengajuanSchema.parse(req.body);

    // 3. Eksekusi pembaruan data via service variabel
    const result = await pengajuanService.updatePengajuanFields(
      id,
      validatedBody,
    );

    if (!result) {
      return res
        .status(404)
        .json({ error: "Gagal memperbarui, data pengajuan tidak ditemukan." });
    }

    return res.status(200).json({
      message: "Data pengajuan kredit berhasil diperbarui oleh admin.",
      data: result,
    });
  } catch (error: any) {
    console.error("Error Update Pengajuan Admin:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({ error: error.errors });
    }

    return res
      .status(500)
      .json({ error: "Terjadi kesalahan pada server saat memperbarui data." });
  }
};

export const uploadDokumenAdmin = async (req: any, res: any) => {
  try {
    const { id } = req.params; // ID Pengajuan

    // Cek apakah ada file yang diunggah dari Multer
    // Karena di Multer menggunakan req.files (upload.fields), kita ambil file pertamanya
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "Tidak ada file yang diunggah." });
    }

    // Ambil fieldname (Misal: 'KTP_KREDITUR') dan data filenya
    const documentType = Object.keys(files)[0];
    const uploadedFile = files[documentType][0];

    // Validasi document type menggunakan Zod schema
    const validatedDocType = documentTypeSchema.parse(documentType);

    // Format path untuk disimpan ke database (menyeragamkan format agar bisa dibaca frontend)
    // Jika di Windows path menggunakan '\', kita ubah jadi '/'
    const pathUrl = `uploads/dokumen/${uploadedFile.filename}`;

    // Cek apakah dokumen tipe ini sudah ada di database untuk ID pengajuan ini
    const existingDoc = await prisma.berkasPendukung.findFirst({
      where: {
        pengajuan_id: Number(id),
        document_type: validatedDocType,
      },
    });

    let result;
    if (existingDoc) {
      // Jika sudah ada, UPDATE datanya
      result = await prisma.berkasPendukung.update({
        where: { id: existingDoc.id },
        data: {
          original_name: uploadedFile.originalname,
          filename: uploadedFile.filename,
          filepath: pathUrl,
          mime_type: uploadedFile.mimetype,
        },
      });
    } else {
      // Jika belum ada (Nasabah belum pernah upload), CREATE data baru
      result = await prisma.berkasPendukung.create({
        data: {
          pengajuan_id: Number(id),
          document_type: validatedDocType,
          original_name: uploadedFile.originalname,
          filename: uploadedFile.filename,
          filepath: pathUrl,
          mime_type: uploadedFile.mimetype,
        },
      });
    }

    return res.status(200).json({
      message: `Berkas ${validatedDocType} berhasil diunggah dan disimpan.`,
      data: result,
    });
  } catch (error) {
    console.error("Error Upload Dokumen Admin:", error);

    // Jika error validasi document type
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues});
    }

    return res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan dokumen." });
  }
};
