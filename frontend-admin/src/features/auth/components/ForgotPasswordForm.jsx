import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1 = input email, 2 = success
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulasi pengiriman email
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {step === 1 ? (
                <>
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                            🔑
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Lupa Password?</h1>
                        <p className="text-gray-500 mt-2">
                            Masukkan email Anda dan kami akan mengirimkan link reset password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@bankkaranganyar.co.id"
                                className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all disabled:opacity-70"
                        >
                            {loading ? 'Mengirimkan Link...' : 'Kirim Link Reset Password'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition"
                        >
                            Kembali ke Login
                        </button>
                    </form>
                </>
            ) : (
                /* Step 2 - Success Message */
                <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center text-5xl mb-6">
                        📧
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Email Terkirim!</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami telah mengirimkan link reset password ke<br />
                        <span className="font-medium text-gray-800">{email}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-6">
                        Silakan cek kotak masuk atau spam Anda.
                    </p>

                    <button
                        onClick={() => navigate('/login')}
                        className="mt-8 w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition"
                    >
                        Kembali ke Halaman Login
                    </button>
                </div>
            )}
        </div>
    );
}