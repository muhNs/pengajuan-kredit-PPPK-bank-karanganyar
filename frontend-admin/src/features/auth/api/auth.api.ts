import { api } from "../../../lib/http.js";
import type { LoginPayload, AuthResponse, UserProfile } from "../types/auth.type.js";

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const logoutApi = async (): Promise<{ message: string }> => {
  const { data } = await api.post("/auth/logout");
  return data;
};

// Opsional: Untuk mengambil data profil user setelah login (sesuai contoh di Dokumentasi API)
export const getProfileApi = async (): Promise<UserProfile> => {
  const { data } = await api.get<UserProfile>("/users/profile");
  return data;
};