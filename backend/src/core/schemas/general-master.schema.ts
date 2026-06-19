import { z } from "zod";

// Schema validasi untuk Create & Update
export const masterDataSchema = z.object({
  nama: z.string().min(2, "Nama minimal terdiri dari 2 karakter"),
});

// Infer type untuk digunakan di Service/Controller
export type MasterDataInput = z.infer<typeof masterDataSchema>;