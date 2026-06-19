import React from 'react';
import { motion } from 'framer-motion';

export default function Step5PengajuanKredit({ formData, setFormData }) {
    
    // Fungsi untuk mengubah angka murni menjadi format Rp 1.000.000
    const formatCurrency = (value) => {
        if (!value) return '';
        const numberOnly = value.replace(/\D/g, '');
        if (!numberOnly) return '';
        return 'Rp ' + new Intl.NumberFormat('id-ID').format(numberOnly);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validasi Tenor (Hanya boleh angka murni)
        if (name === 'tenor_kredit' && value !== '') {
            if (!/^\d+$/.test(value)) return; 
        }

        // Format otomatis untuk nominal pinjaman
        if (name === 'nominal_kredit') {
            setFormData(prev => ({
                ...prev,
                [name]: formatCurrency(value)
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span>
                        Data Pengajuan Kredit
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 ml-11">
                        Tentukan jumlah pinjaman (plafon), jangka waktu cicilan (tenor), dan tujuan penggunaan dana kredit Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* TUJUAN PENGGUNAAN KREDIT */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Tujuan Penggunaan Kredit <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="penggunaan_kredit"
                            value={formData.penggunaan_kredit}
                            onChange={handleInputChange}
                            required
                            placeholder="Contoh: Renovasi Rumah, Biaya Pendidikan, Modal Usaha"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* NOMINAL PENGAJUAN (PLAFON) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nominal Pengajuan (Plafon) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nominal_kredit"
                            value={formData.nominal_kredit}
                            onChange={handleInputChange}
                            required
                            placeholder="Rp 0"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all font-bold text-[#0B1121] text-lg"
                        />
                    </div>

                    {/* TENOR (JANGKA WAKTU) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Jangka Waktu (Tenor) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="tenor_kredit"
                                value={formData.tenor_kredit}
                                onChange={handleInputChange}
                                required
                                placeholder="Contoh: 12"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all pr-16"
                            />
                            {/* Label "Bulan" statis di dalam input */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <span className="text-gray-500 font-medium">Bulan</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">Masukkan angka dalam hitungan bulan (contoh: 12, 24, 36)</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}