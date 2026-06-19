import { prisma } from "@/lib/prisma.js"; // Sesuaikan dengan path konfigurasi prisma Anda
import type {
  InstansiInput,
  UpdateInstansiInput,
} from "../schemas/instansi-master.schema.js";

export const getAllInstansi = async () => {
  return await prisma.instansi.findMany({
    orderBy: { id: "desc" }, // Menampilkan data terbaru di atas
  });
};

export const getInstansiById = async (id: number) => {
  const instansi = await prisma.instansi.findUnique({
    where: { id },
  });

  if (!instansi) throw new Error("Data instansi tidak ditemukan");
  return instansi;
};

export const createInstansi = async (data: InstansiInput) => {
  const existingInstansi = await prisma.instansi.findFirst({
    where: {
      nama_instansi: data.nama_instansi,
    },
  });

  if (existingInstansi) {
    throw new Error("Instansi dengan nama tersebut sudah ada");
  }

  return await prisma.instansi.create({
    data: {
      nama_instansi: data.nama_instansi,
      alamat: data.alamat_instansi,
      nama_kepala_dinas: data.nama_kepala_dinas,
      nip_kepala_dinas: data.nip_kepala_dinas,
      nama_bendahara_dinas: data.nama_bendahara,
      nip_bendahara_dinas: data.nip_bendahara,
    },
  });
};

export const updateInstansi = async (id: number, data: UpdateInstansiInput) => {
  const existingInstansi = await prisma.instansi.findUnique({
    where: { id },
  });

  if (!existingInstansi) {
    throw new Error("Instansi tidak ditemukan");
  }

  return await prisma.instansi.update({
    where: { id },
    data,
  });
};

export const deleteInstansi = async (id: number) => {
  const existingInstansi = await prisma.instansi.findUnique({
    where: { id },
  });

  if (!existingInstansi) {
    throw new Error("Instansi tidak ditemukan");
  }

  return await prisma.instansi.delete({
    where: { id },
  });
};
