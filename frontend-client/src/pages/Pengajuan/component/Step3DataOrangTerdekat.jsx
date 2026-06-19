import React from "react";
import { motion } from "framer-motion";

export default function Step3DataOrangTerdekat({ formData, setFormData }) {
    // Fungsi khusus untuk menangani perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validasi: Input yang hanya boleh angka
        if (["nik_kerabat", "telp_kerabat"].includes(name) && value !== "") {
            if (!/^\d+$/.test(value)) return; // Tolak jika user mengetik huruf
        }

        // Validasi: Batasi NIK maksimal 16 digit
        if (name === "nik_kerabat" && value.length > 16) return;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                            3
                        </span>
                        Data Penjamin / Orang Terdekat
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 ml-11">
                        Isi data keluarga atau kerabat dekat yang tidak tinggal
                        serumah dan dapat dihubungi dalam keadaan darurat.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* NAMA PENJAMIN */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama Lengkap Penjamin (Sesuai KTP){" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nama_kerabat"
                            value={formData.nama_kerabat}
                            onChange={handleInputChange}
                            required
                            placeholder="Contoh: Ahmad Hidayat"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* NIK PENJAMIN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nomor Induk Kependudukan (NIK){" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nik_kerabat"
                            value={formData.nik_kerabat}
                            onChange={handleInputChange}
                            required
                            placeholder="16 Digit Angka NIK"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* TELEPON PENJAMIN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nomor Handphone / WhatsApp{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="telp_kerabat"
                            value={formData.telp_kerabat}
                            onChange={handleInputChange}
                            required
                            placeholder="Contoh: 08123456789"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* HUBUNGAN KEKERABATAN */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Hubungan dengan Pemohon{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="hubungan_kerabat"
                            value={formData.hubungan_kerabat}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] bg-gray-50 outline-none transition-all"
                        >
                            <option value="">Pilih Hubungan Kekerabatan</option>
                            <option value="Orang Tua">Orang Tua</option>
                            <option value="Anak Kandung">Anak Kandung</option>
                            <option value="Saudara Kandung">
                                Saudara Kandung
                            </option>
                            <option value="Keluarga Lainnya">
                                Keluarga Lainnya
                            </option>
                        </select>
                    </div>

                    {/* ALAMAT PENJAMIN */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Alamat Tempat Tinggal Penjamin{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="alamat_kerabat"
                            value={formData.alamat_kerabat}
                            onChange={handleInputChange}
                            required
                            rows="2"
                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* =======================================================================
                BAGIAN 2: DATA PASANGAN PENJAMIN (FITUR BARU)
                ======================================================================= */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-base font-bold text-[#0B1171] whitespace-nowrap">
                            Data Pasangan Penjamin{" "}
                            <span className="text-sm font-normal text-gray-500 italic">
                                (Jika Ada)
                            </span>
                        </h3>
                        <div className="flex-grow h-[1px] bg-gray-200"></div>
                    </div>

                    <div className="space-y-6">
                        {/* Baris 1: Nama Lengkap & NIK Pasangan Penjamin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0B1171]">
                                    Nama Lengkap Pasangan
                                </label>
                                <input
                                    type="text"
                                    name="nama_pasangan_kerabat"
                                    value={formData.nama_pasangan_kerabat || ""}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama pasangan penjamin"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0B1171]">
                                    Nomor Induk Kependudukan (NIK)
                                </label>
                                <input
                                    type="text"
                                    name="nik_pasangan_kerabat"
                                    value={formData.nik_pasangan_kerabat || ""}
                                    onChange={handleChange}
                                    placeholder="NIK (16 digit)"
                                    inputMode="numeric"
                                    maxLength={16}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                                />
                            </div>
                        </div>

                        {/* Baris 2: Alamat Pasangan Penjamin (Textarea) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Alamat Lengkap
                            </label>
                            <textarea
                                name="alamat_pasangan_kerabat"
                                value={formData.alamat_pasangan_kerabat || ""}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Masukkan alamat lengkap pasangan penjamin"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm resize-none"
                            ></textarea>
                        </div>

                        {/* Baris 3: No Telepon Pasangan Penjamin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#0B1171]">
                                    No Telepon / WA
                                </label>
                                <input
                                    type="tel"
                                    name="telp_pasangan_kerabat"
                                    value={formData.telp_pasangan_kerabat || ""}
                                    onChange={handleChange}
                                    placeholder="Masukkan nomor telepon aktif"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                                />
                            </div>
                            {/* Kolom kosong untuk menyeimbangkan grid */}
                            <div className="hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
