import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { getProfileApi } from "../api/auth.api";

export default function ProtectedRoute() {
  const { isAuthenticated, isInitialized, setAuth, setInitialized, clearAuth } =
    useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      // Jika sudah inisialisasi, jangan lakukan pengecekan lagi agar tidak boros API
      if (isInitialized) return;

      try {
        // Tembak API profil. Browser akan otomatis mengirimkan cookie.
        const userData = await getProfileApi();

        // Jika sukses (cookie valid), pulihkan sesi user
        setAuth(userData);
      } catch (error) {
        // Jika gagal (cookie expired atau tidak ada), bersihkan sesi
        clearAuth();
      } finally {
        // Tandai bahwa pengecekan telah selesai
        setInitialized(true);
      }
    };

    checkSession();
  }, [isInitialized, setAuth, setInitialized, clearAuth]);

  // Saat pengecekan masih berjalan, tampilkan layar loading
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1121] text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-10 h-10 border-4 border-[#FFC800] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black uppercase tracking-[0.2em] text-xs text-gray-400">
            Memverifikasi Sesi...
          </p>
        </div>
      </div>
    );
  }

  // Jika pengecekan selesai dan statusnya tidak terotentikasi, usir ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, render halaman Admin (Sidebar, Dashboard, dll)
  return <Outlet />;
}
