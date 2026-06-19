import React from "react";
import { motion } from "framer-motion";

export default function Step1DataDiri({
    formData,
    setFormData,
    masterOptions,
}) {
    // Fungsi khusus untuk menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validasi: Input yang hanya boleh angka
        if (
            ["nik", "no_telp", "kode_pos", "npwp"].includes(name) &&
            value !== ""
        ) {
            if (!/^\d+$/.test(value)) return; // Tolak jika user mengetik huruf
        }

        // Validasi: Batasi NIK maksimal 16 digit
        if (name === "nik" && value.length > 16) return;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-lg font-bold text-[#0B1171] whitespace-nowrap">
                        Informasi Pribadi
                    </h3>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                </div>

                <div className="space-y-6">
                    {/* Baris 1: Nama Lengkap & Alamat */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama || ""}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Alamat
                            </label>
                            <input
                                type="text"
                                name="alamat"
                                value={formData.alamat || ""}
                                onChange={handleChange}
                                placeholder="Masukkan alamat lengkap"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* REVISI: Baris 2 - Kode Pos, Email, dan Nomor Telepon */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Kode Pos
                            </label>
                            <input
                                type="number"
                                name="kode_pos"
                                value={formData.kode_pos || ""}
                                onChange={handleChange}
                                placeholder="57xxx"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="Masukkan email aktif"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Nomor Telepon / WA
                            </label>
                            <input
                                type="tel"
                                name="no_telp"
                                value={formData.no_telp || ""}
                                onChange={handleChange}
                                placeholder="Contoh: 08123456789"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                            />
                        </div>
                    </div>

                    {/* Baris 3: Jenis Kelamin, NIK, dan Nama Ibu Kandung */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Jenis Kelamin
                            </label>
                            <select
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                            >
                                <option value="">Pilih jenis kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                NIK
                            </label>
                            <input
                                type="number"
                                name="nik"
                                value={formData.nik || ""}
                                onChange={handleChange}
                                placeholder="NIK (16 digit)"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Nama Ibu Kandung
                            </label>
                            <input
                                type="text"
                                name="nama_ibu"
                                value={formData.nama_ibu || ""}
                                onChange={handleChange}
                                placeholder="Nama lengkap ibu kandung"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-base font-bold text-[#0B1171] whitespace-nowrap">
                        Informasi Tambahan
                    </h3>
                    <div className="flex-grow h-[1px] bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Status Rumah
                        </label>
                        <select
                            name="status_rumah"
                            value={formData.status_rumah || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                        >
                            <option value="">Pilih status</option>
                            <option value="Milik Sendiri">Milik Sendiri</option>
                            <option value="Sewa">Sewa/Kontrak</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Status Pernikahan
                        </label>
                        <select
                            name="status_pernikahan"
                            value={formData.status_pernikahan || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                        >
                            <option value="">Pilih status</option>
                            <option value="Belum Menikah">Belum Menikah</option>
                            <option value="Menikah">Menikah</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            NPWP
                        </label>
                        <input
                            type="text"
                            name="npwp"
                            value={formData.npwp || ""}
                            onChange={handleChange}
                            placeholder="Nomor NPWP"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* =======================================================================
                BAGIAN 3: DATA KERABAT (REVISI BARU)
                ======================================================================= */}
            <div className="pt-2">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-base font-bold text-[#0B1171] whitespace-nowrap">
                        Data Kerabat
                    </h3>
                    <div className="flex-grow h-[1px] bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Nama Kerabat
                        </label>
                        <input
                            type="text"
                            name="nama_kerabat"
                            value={formData.nama_kerabat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan nama kerabat"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            NIK Kerabat
                        </label>
                        <input
                            type="number"
                            name="nik_kerabat"
                            value={formData.nik_kerabat || ""}
                            onChange={handleChange}
                            placeholder="NIK Kerabat (16 digit)"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Alamat Kerabat
                        </label>
                        <input
                            type="text"
                            name="alamat_kerabat"
                            value={formData.alamat_kerabat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan alamat lengkap kerabat"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Nomor Telepon Kerabat
                        </label>
                        <input
                            type="tel"
                            name="telp_kerabat"
                            value={formData.telp_kerabat || ""}
                            onChange={handleChange}
                            placeholder="Contoh: 08123456789"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
