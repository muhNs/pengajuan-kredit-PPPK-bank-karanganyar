import React from 'react';
import { motion } from 'framer-motion';

export default function Step6UploadBerkas({ formData, setFormData }) {

    // Fungsi untuk menangani file yang dipilih
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // Validasi Ukuran (Maksimal 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert(`Ukuran file ${file.name} terlalu besar! Maksimal 2MB.`);
            e.target.value = ''; // Reset input
            return;
        }

        // Validasi Ekstensi File
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert(`Format file ${file.name} tidak didukung! Gunakan JPG, PNG, atau PDF.`);
            e.target.value = ''; // Reset input
            return;
        }

        setFormData(prev => ({
            ...prev,
            [fieldName]: file
        }));
    };

    // Fungsi untuk menghapus file yang sudah dipilih
    const removeFile = (fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null
        }));
    };

    // Komponen Reusable untuk Kotak Upload
    const FileUploadCard = ({ label, fieldName, required, accept = ".jpg,.jpeg,.png,.pdf" }) => {
        const selectedFile = formData[fieldName];

        return (
            <div className="flex flex-col gap-1.5">
                <label className="block text-[15px] font-bold text-[#152042]">
                    {label}
                </label>

                {!selectedFile ? (
                    <input
                        type="file"
                        id={fieldName}
                        name={fieldName}
                        accept={accept}
                        onChange={(e) => handleFileChange(e, fieldName)}
                        required={required}
                        className="w-full h-[50px] text-gray-400 text-sm border border-gray-200 rounded-xl cursor-pointer bg-white p-1.5
                                   file:cursor-pointer file:h-full file:px-6 file:mr-4 file:border-0 file:rounded-lg
                                   file:bg-[#F0F4F8] file:text-[#152042] file:font-semibold hover:file:bg-[#e2e8f0] transition-all"
                    />
                ) : (
                    <div className="border border-green-200 bg-green-50 rounded-xl h-[50px] px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-green-700 truncate" title={selectedFile.name}>
                                {selectedFile.name}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFile(fieldName)}
                            className="text-red-500 hover:text-red-700 font-bold px-2 shrink-0"
                            title="Hapus File"
                        >
                            ✕
                        </button>
                    </div>
                )}
                
                <p className="text-[11px] text-gray-400 italic mt-0.5">
                    {selectedFile ? 'File siap diunggah' : 'Belum ada file dipilih'}
                </p>
            </div>
        );
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
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                            6
                        </span>
                        BERKAS
                    </h2>
                </div>

                {/* Banner Instruksi */}
                <div className="mb-8 bg-[#F0F4F8] rounded-xl p-5 border border-blue-50 flex items-start gap-4">
                    <div className="bg-[#152042] shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-serif italic text-sm mt-0.5">
                        i
                    </div>
                    <div>
                        <h3 className="text-[15px] font-bold text-[#152042] mb-2">Instruksi Pengunggahan:</h3>
                        <ul className="text-sm text-gray-600 space-y-1.5 list-disc ml-4">
                            <li>Format file yang didukung: <strong>JPG, PNG, atau PDF</strong>.</li>
                            <li>Ukuran maksimal per file adalah <strong>2 MB</strong>.</li>
                            <li>Pastikan dokumen asli dapat terbaca dengan jelas (tidak buram).</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    {/* KIRI */}
                    <div className="space-y-6">
                        <FileUploadCard label="Upload KTP Nasabah" fieldName="file_ktp" required={true} />
                        <FileUploadCard label="Upload KTP Pasangan" fieldName="file_ktp_pasangan" required={false} />
                        <FileUploadCard label="Upload Ijazah Terakhir" fieldName="file_ijazah" required={true} />
                        <FileUploadCard label="Upload Kartu NPWP" fieldName="file_npwp" required={false} />
                    </div>
                    
                    {/* KANAN */}
                    <div className="space-y-6">
                        <FileUploadCard label="Upload Kartu Keluarga (KK)" fieldName="file_kk" required={true} />
                        <FileUploadCard label="Upload Surat Nikah" fieldName="file_surat_nikah" required={false} />
                        <FileUploadCard label="Upload SK (Surat Keputusan)" fieldName="file_sk" required={true} />
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-lg font-bold text-[#152042] mb-4">Pernyataan & Persetujuan</h3>
                    
                    {/* Kotak Teks Scrollable */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 mb-5 h-64 overflow-y-auto text-sm text-gray-700 leading-relaxed shadow-inner custom-scrollbar">
                        <p className="mb-4">
                            Memuat syarat dan ketentuan pengajuan kredit online oleh debitur dalam melakukan pengisian data pribadinya. calon debitur telah <b>“Setuju dalam mengajukan Pinjaman”</b> yang menyatakan hal-hal sebagai berikut :
                        </p>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li>Kebenaran data dan informasi yang saya berikan dalam pengajuan ini adalah sesuai keadaaan yang sebenar-benarnya.</li>
                            <li>Saya menyetujui bahwa PT BPR BANK KARANGANYAR (PERSERODA) yang selanjutnya disebut Bank, berwenang untuk:
                                <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2">
                                    <li>Memeriksa kebenaran data yang saya sampaikan dalam pengajuan ini</li>
                                    <li>Memperoleh keterangan dan referensi dari sumber manapun dengan cara yang dianggap sah oleh Bank</li>
                                    <li>Menyetujui atau menolak pengajuan pinjaman saya berdasarkan hasil analisa Bank</li>
                                    <li>Tidak mengembalikan seluruh dokumen yang telah saya serahkan kepada Bank</li>
                                    <li>Memberikan secara terbatas dan/atau tidak terbatas data yang telah saya sampaikan dalam pengajuan ini kepada pihak ketiga dalam rangka kepentingan pemrosesan pengajuan pinjaman.</li>
                                    <li>Menggunakan data dan atau informasi pribadi saya untuk proses pemeriksaan SLIK</li>
                                </ol>
                            </li>
                            <li>Saya memahami dan mengerti bahwa Bank tidak berkewajiban untuk memberikan fasilitas kredit kepada saya hingga saya memenuhi semua persyaratan yang berlaku pada Bank dan telah menandatangani dokumen yang diperlukan Bank dalam pemberian kredit.</li>
                            <li>Apabila ternyata data dan informasi, serta pernyataan yang saya berikan/buat tidak sesuai dengan keadaan yang sebenarnya, maka segala risiko dan konsekuensi yang diakibatkannya menjadi sepenuhnya tanggung jawab saya.</li>
                        </ol>
                    </div>

                    {/* Single Checklist */}
                    <div
                        onClick={() => setFormData({...formData, setuju_pernyataan: !formData.setuju_pernyataan})}
                        className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200 flex items-start gap-4 transition-colors hover:bg-gray-100 cursor-pointer shadow-sm"
                    >
                        <input
                            type="checkbox"
                            id="setuju_pernyataan"
                            name="setuju_pernyataan"
                            checked={formData.setuju_pernyataan || false}
                            onChange={(e) => setFormData({...formData, setuju_pernyataan: e.target.checked})}
                            onClick={(e) => e.stopPropagation()} // Mencegah klik ganda saat mengeklik input langsung
                            className="w-5 h-5 shrink-0 mt-0.5 border-gray-300 rounded text-[#152042] focus:ring-[#152042] cursor-pointer"
                        />
                        <label htmlFor="setuju_pernyataan" className="cursor-pointer text-sm font-bold text-[#152042] leading-relaxed select-none">
                            Saya telah membaca, memahami, dan menyetujui seluruh syarat dan pernyataan pengajuan pinjaman di atas.
                        </label>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}