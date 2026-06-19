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

    // Fungsi untuk menangani perubahan checkbox "belum menikah"
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            is_belum_menikah: checked,
            // Kosongkan data pasangan jika dicentang
            ...(checked ? {
                nama_pasangan: '',
                nik_pasangan: '',
                telp_pasangan: '',
                alamat_pasangan: ''
            } : {})
        }));
    };

    const isBelumMenikah = formData.is_belum_menikah || false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[450px] flex flex-col">
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                            2
                        </span>
                        SUAMI / ISTRI
                    </h2>
                </div>

                {/* Banner Informasi */}
                <div className="mb-6 bg-yellow-50/80 border border-yellow-200/60 rounded-xl p-4 flex items-start gap-3">
                    <div className="bg-[#FFC800] p-1 rounded-full mt-0.5 shadow-sm text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </div>
                    <div>
                        <p className="text-[13px] text-gray-700 font-medium pt-0.5">Lengkapi data suami/istri Anda dengan benar.</p>
                    </div>
                </div>

                {/* Checkbox Belum Menikah */}
                <div className="mb-8">
                    <label className="flex items-start gap-3 cursor-pointer group w-fit">
                        <div className="relative flex items-center justify-center mt-0.5">
                            <input 
                                type="checkbox" 
                                checked={isBelumMenikah}
                                onChange={handleCheckboxChange}
                                className="peer appearance-none w-5 h-5 border-[1.5px] border-gray-300 rounded-[4px] checked:bg-white checked:border-gray-300 transition-colors cursor-pointer"
                            />
                            <svg className="absolute w-3.5 h-3.5 text-gray-500 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-gray-800">Saya belum menikah</span>
                            <span className="block text-xs text-gray-400 mt-0.5">Centang pilihan ini jika Anda belum menikah.</span>
                        </div>
                    </label>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 transition-opacity duration-300 ${isBelumMenikah ? 'opacity-40 pointer-events-none grayscale-[50%]' : ''}`}>
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
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
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
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
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
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
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
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}