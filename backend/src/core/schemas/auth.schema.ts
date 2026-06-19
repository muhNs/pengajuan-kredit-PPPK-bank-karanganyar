import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(), // Ubah jadi email
  password: z.string()
});

export type LoginInput = z.infer<typeof loginSchema>;