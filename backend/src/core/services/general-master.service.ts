import { prisma } from "@/lib/prisma.js"; // Sesuaikan dengan path konfigurasi prisma Anda
import type { MasterDataInput } from "../schemas/general-master.schema.js";

// Helper untuk eksekusi query berdasarkan kategori
// Menggunakan pendekatan ini agar TypeScript tetap aman (Type-Safe)
const executeDbOperation = async (category: string, action: 'find' | 'create' | 'update' | 'delete', data?: any) => {
  switch (category) {
    case 'status-rumah':
      if (action === 'find') return await prisma.statusRumah.findMany();
      if (action === 'create') return await prisma.statusRumah.create({ data: { kepemilikan: data.nama } });
      if (action === 'update') return await prisma.statusRumah.update({ where: { id: data.id }, data: { kepemilikan: data.nama } });
      if (action === 'delete') return await prisma.statusRumah.delete({ where: { id: data.id } });
      break;

    case 'status-pernikahan':
      if (action === 'find') return await prisma.statusPernikahan.findMany();
      if (action === 'create') return await prisma.statusPernikahan.create({ data: { status: data.nama } });
      if (action === 'update') return await prisma.statusPernikahan.update({ where: { id: data.id }, data: { status: data.nama } });
      if (action === 'delete') return await prisma.statusPernikahan.delete({ where: { id: data.id } });
      break;

    case 'jenis-kelamin':
      if (action === 'find') return await prisma.jenisKelamin.findMany();
      if (action === 'create') return await prisma.jenisKelamin.create({ data: { gender: data.nama } });
      if (action === 'update') return await prisma.jenisKelamin.update({ where: { id: data.id }, data: { gender: data.nama } });
      if (action === 'delete') return await prisma.jenisKelamin.delete({ where: { id: data.id } });
      break;

    default:
      throw new Error("Kategori master data tidak ditemukan");
  }
};

export const getAllData = async (category: string) => {
  return await executeDbOperation(category, 'find');
};

export const createData = async (category: string, payload: MasterDataInput) => {
  return await executeDbOperation(category, 'create', { nama: payload.nama });
};

export const updateData = async (category: string, id: number, payload: MasterDataInput) => {
  return await executeDbOperation(category, 'update', { id, nama: payload.nama });
};

export const deleteData = async (category: string, id: number) => {
  return await executeDbOperation(category, 'delete', { id });
};