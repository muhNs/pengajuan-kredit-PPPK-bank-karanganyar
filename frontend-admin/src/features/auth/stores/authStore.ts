import { create } from "zustand";
import type { UserProfile } from "../types/auth.type";

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isInitialized: boolean;

  // Actions
  setAuth: (user?: UserProfile) => void;
  clearAuth: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isInitialized: false,

  // Fungsi dipanggil ketika login berhasil
  setAuth: (user) =>
    set({
      isAuthenticated: true,
      user,
    }),

  // Fungsi dipanggil ketika logout atau token kadaluwarsa
  clearAuth: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),

  // Fungsi dipanggil ketika pengecekan sesi sudah selesai
  setInitialized: (value) =>
    set({
      isInitialized: value,
    }),
}));
