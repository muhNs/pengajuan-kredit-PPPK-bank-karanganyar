import {z} from "zod";

export const getProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
})

export const createUserSchema = z.object({
  username: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  role: z.enum(["ADMIN", "CS"]).default("CS"),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(), // Opsional saat update
  role: z.enum(["ADMIN", "CS"]).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetProfileInput = z.infer<typeof getProfileSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;