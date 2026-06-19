import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Sesuaikan path jika berbeda

export default function LoginForm() {
    const navigate = useNavigate();
    
    // Panggil fungsi dan state dari custom hook
    const { handleLogin, isLoading, error } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    
    // [BARU] State untuk mengontrol visibilitas password
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Panggil fungsi handleLogin dari hook, lempar payload-nya
        await handleLogin({ 
            email: form.email, 
            password: form.password 
        });
    };

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 animate-slide-up">
            <div className="text-center mb-8">
                <img 
                    src="/src/assets/logo-final.png" 
                    alt="Bank Karanganyar" 
                    className="h-16 w-auto mx-auto mb-6 drop-shadow-xl" 
                />
                <h1 className="text-3xl font-bold text-gray-800">Selamat Datang</h1>
                <p className="text-gray-500 mt-2">Masuk ke Sistem Admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email / NIP</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Masukkan email atau NIP"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    {/* [PERBAIKAN] Container relative untuk memposisikan ikon di dalam input */}
                    <div className="relative">
                        <input
                            // Ubah tipe input secara dinamis berdasarkan state showPassword
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
                            // Tambahkan pr-12 agar teks tidak tertutup ikon
                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pr-12"
                            placeholder="Masukkan password"
                            required
                        />
                        
                        {/* Tombol Toggle Show/Hide Password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        >
                            {showPassword ? (
                                // Ikon Mata Terbuka (Eye Off - Menyembunyikan)
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                            ) : (
                                // Ikon Mata Tertutup (Eye - Menampilkan)
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Penanganan error menggunakan state 'error' dari hook useAuth */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                        <p className="text-red-500 text-center text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Lupa Password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-[#152042] to-[#0B1171] text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-lg flex justify-center items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Sedang Masuk...
                        </>
                    ) : (
                        "Masuk ke Dashboard"
                    )}
                </button>
            </form>
        </div>
    );
}