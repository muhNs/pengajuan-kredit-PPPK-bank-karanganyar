import { z } from "zod";

export const instansiSchema = z.object({
  nama_instansi: z.string().min(3, "Nama instansi minimal 3 karakter"),
  alamat_instansi: z.string().min(5, "Alamat instansi minimal 5 karakter"),
  nama_kepala_dinas: z.string().min(3, "Nama Kepala Dinas minimal 3 karakter"),
  nip_kepala_dinas: z.string().min(5, "NIP Kepala Dinas tidak valid"),
  nama_bendahara: z.string().min(3, "Nama Bendahara minimal 3 karakter"),
  nip_bendahara: z.string().min(5, "NIP Bendahara tidak valid"),
});

export const updateInstansiSchema = z.object({
  nama_instansi: z.string().min(3, "Nama instansi minimal 3 karakter").optional(),
  alamat_instansi: z.string().min(5, "Alamat instansi minimal 5 karakter").optional(),
  nama_kepala_dinas: z.string().min(3, "Nama Kepala Dinas minimal 3 karakter").optional(),
  nip_kepala_dinas: z.string().min(5, "NIP Kepala Dinas tidak valid").optional(),
  nama_bendahara: z.string().min(3, "Nama Bendahara minimal 3 karakter").optional(),
  nip_bendahara: z.string().min(5, "NIP Bendahara tidak valid").optional(),
});

export type InstansiInput = z.infer<typeof instansiSchema>;
export type UpdateInstansiInput = z.infer<typeof updateInstansiSchema>;
