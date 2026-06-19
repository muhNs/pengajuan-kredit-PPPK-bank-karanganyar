import React from 'react';
import { motion } from 'framer-motion';

export default function Step4DataPegawaiPendapatan({ formData, setFormData, masterOptions }) {
    
    // Fungsi untuk mengubah angka murni menjadi format Rp 1.000.000
    const formatCurrency = (value) => {
        if (!value) return '';
        // Hapus semua karakter selain angka
        const numberOnly = value.replace(/\D/g, '');
        if (!numberOnly) return '';
        // Format menggunakan standar Indonesia
        return 'Rp ' + new Intl.NumberFormat('id-ID').format(numberOnly);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // CATATAN: Jangan gunakan .trim() di sini karena akan memblokir input spasi
        // di field teks seperti jabatan. Trim hanya dilakukan saat submit jika diperlukan.

        // Validasi NIP (Hanya boleh angka, tanpa spasi)
        if (name === 'nip' && value !== '') {
            if (!/^\d+$/.test(value)) return; 
        }

        // Format otomatis untuk input pendapatan
        if (name === 'pendapatan_tetap' || name === 'pendapatan_tidak_tetap') {
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[450px] flex flex-col">
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span>
                        Data Pekerjaan & Pendapatan
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 ml-11">
                        Isi detail pekerjaan dan instansi tempat Anda bekerja saat ini beserta rincian pendapatan per bulan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* DROPDOWN INSTANSI (Dari API Backend) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Instansi / Dinas Tempat Bekerja <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="instansi"
                            value={formData.instansi}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] bg-gray-50 outline-none transition-all"
                        >
                            <option value="">-- Pilih Instansi / Dinas --</option>
                            {masterOptions?.instansi?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama_instansi}
                                </option>
                            ))}
                        </select>
                        {masterOptions?.instansi?.length === 0 && (
                            <p className="text-xs text-red-500 mt-1">Gagal memuat daftar instansi. Coba muat ulang halaman.</p>
                        )}
                    </div>

                    {/* JABATAN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Jabatan Saat Ini <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="jabatan"
                            value={formData.jabatan}
                            onChange={handleInputChange}
                            required
                            placeholder="Contoh: Staff Keuangan"
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* NIP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nomor Induk Pegawai (NIP) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nip"
                            value={formData.nip}
                            onChange={handleInputChange}
                            required
                            placeholder="Masukkan NIP Anda"
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                        />
                    </div>

                    {/* PENDAPATAN TETAP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pendapatan Tetap (Gaji Pokok) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="pendapatan_tetap"
                            value={formData.pendapatan_tetap}
                            onChange={handleInputChange}
                            required
                            placeholder="Rp 0"
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all font-semibold text-gray-700"
                        />
                    </div>

                    {/* PENDAPATAN TIDAK TETAP (OPSIONAL) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pendapatan Lainnya / Tunjangan <span className="text-gray-400 text-xs font-normal">(Opsional)</span>
                        </label>
                        <input
                            type="text"
                            name="pendapatan_tidak_tetap"
                            value={formData.pendapatan_tidak_tetap}
                            onChange={handleInputChange}
                            placeholder="Rp 0"
                            className="w-full px-4 py-3 h-[50px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all text-gray-700"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}