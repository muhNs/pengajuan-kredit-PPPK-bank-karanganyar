import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, logoutApi, getProfileApi } from "../api/auth.api";
import { useAuthStore } from "../stores/authStore";
import type { LoginPayload } from "../types/auth.type";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Tembak API Login untuk mendapatkan HttpOnly Cookies
        await loginApi(payload);
        
        // 2. Wajib: Ambil profil user setelah login berhasil
        const response = await getProfileApi();
        // 3. Simpan data profil (name, email, role) ke Global Store
        setAuth(response);
        
        // 4. Jika semua di atas sukses, pindahkan ke halaman Admin
        navigate("/admin", { replace: true });
        
      } catch (err: any) {
        // Jika login gagal ATAU ambil profil gagal, tangkap errornya
        const responseMessage = err?.response?.data?.error || err?.response?.data?.message;
        let formattedMessage = "Terjadi kesalahan saat login";

        // Handle error Zod stringified array (jika ada)
        if (typeof responseMessage === "string" && responseMessage.startsWith("[")) {
            try {
                const parsedError = JSON.parse(responseMessage);
                if (Array.isArray(parsedError) && parsedError.length > 0) {
                    formattedMessage = parsedError[0].message;
                }
            } catch {
                formattedMessage = responseMessage;
            }
        } else if (typeof responseMessage === "string") {
            formattedMessage = responseMessage;
        }

        setError(formattedMessage);
        
        // Pastikan store dikosongkan jika gagal di tengah jalan
        clearAuth(); 
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setAuth, clearAuth] // Tambahkan clearAuth di dependency
  );

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout di sisi server gagal:", err);
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  return {
    handleLogin,
    handleLogout,
    isLoading,
    error,
  };
};