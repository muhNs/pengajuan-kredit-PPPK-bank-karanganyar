import React from 'react';
import { motion } from 'framer-motion';

export default function Step2DataSuamiIstri({ formData, setFormData }) {
    
    // Fungsi khusus untuk menangani perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Validasi: Input yang hanya boleh angka
        if (['nik_pasangan', 'telp_pasangan'].includes(name) && value !== '') {
            if (!/^\d+$/.test(value)) return; // Tolak jika user mengetik huruf
        }

        // Validasi: Batasi NIK maksimal 16 digit
        if (name === 'nik_pasangan' && value.length > 16) return;

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
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                        Data Suami / Istri
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 ml-11">
                        Isi data pasangan Anda. <span className="font-semibold text-[#152042]">Jika Anda belum menikah, Anda dapat mengosongkan form ini</span> dan langsung klik tombol Selanjutnya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* NAMA PASANGAN */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama Suami / Istri (Sesuai KTP)
                        </label>
                        <input
                            type="text"
                            name="nama_pasangan"
                            value={formData.nama_pasangan}
                            onChange={handleInputChange}
                            placeholder="Contoh: Siti Aminah"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* NIK PASANGAN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nomor Induk Kependudukan (NIK)
                        </label>
                        <input
                            type="text"
                            name="nik_pasangan"
                            value={formData.nik_pasangan}
                            onChange={handleInputChange}
                            placeholder="16 Digit Angka NIK"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* TELEPON PASANGAN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nomor Handphone / WhatsApp
                        </label>
                        <input
                            type="text"
                            name="telp_pasangan"
                            value={formData.telp_pasangan}
                            onChange={handleInputChange}
                            placeholder="Contoh: 08123456789"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* ALAMAT PASANGAN */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Alamat Tempat Tinggal Saat Ini
                        </label>
                        <textarea
                            name="alamat_pasangan"
                            value={formData.alamat_pasangan}
                            onChange={handleInputChange}
                            rows="2"
                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}