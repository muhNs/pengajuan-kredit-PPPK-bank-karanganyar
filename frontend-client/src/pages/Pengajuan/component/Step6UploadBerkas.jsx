import React from 'react';
import { motion } from 'framer-motion';

export default function Step6UploadBerkas({ formData, setFormData }) {

    // Fungsi untuk menangani file yang dipilih
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // Validasi Ukuran (Maksimal 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert(`Ukuran file ${file.name} terlalu besar! Maksimal 5MB.`);
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
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors relative">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <p className="text-xs text-gray-500 mb-3">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                    </div>

                    {!selectedFile ? (
                        <div className="relative">
                            <input
                                type="file"
                                id={fieldName}
                                name={fieldName}
                                accept={accept}
                                onChange={(e) => handleFileChange(e, fieldName)}
                                required={required}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="bg-white border border-dashed border-gray-300 rounded-lg px-4 py-3 text-center cursor-pointer hover:border-[#FFC800] transition-colors">
                                <span className="text-sm text-[#FFC800] font-medium">+ Pilih File</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs font-medium text-green-800 truncate" title={selectedFile.name}>
                                    {selectedFile.name}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(fieldName)}
                                className="text-red-500 hover:text-red-700 p-1 shrink-0"
                                title="Hapus File"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-[#FFC800] text-[#0B1121] w-8 h-8 rounded-lg flex items-center justify-center text-sm">6</span>
                        Unggah Berkas Pendukung
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 ml-11">
                        Pastikan foto atau hasil scan dokumen dapat dibaca dengan jelas, tidak terpotong, dan tidak buram.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* BERKAS WAJIB */}
                    <FileUploadCard label="KTP Pemohon" fieldName="file_ktp" required={true} />
                    <FileUploadCard label="Kartu Keluarga (KK)" fieldName="file_kk" required={true} />
                    <FileUploadCard label="SK Pengangkatan PPPK" fieldName="file_sk" required={true} />
                    <FileUploadCard label="Ijazah Terakhir" fieldName="file_ijazah" required={true} />
                    
                    {/* BERKAS OPSIONAL */}
                    <FileUploadCard label="KTP Suami/Istri" fieldName="file_ktp_pasangan" required={false} />
                    <FileUploadCard label="Surat Nikah" fieldName="file_surat_nikah" required={false} />
                    <FileUploadCard label="NPWP" fieldName="file_npwp" required={false} />
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800 flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            <strong>Perhatian:</strong> Dengan mengklik tombol "Kirim Pengajuan" di bawah ini, Anda menyatakan bahwa seluruh data dan dokumen yang dilampirkan adalah benar dan dapat dipertanggungjawabkan secara hukum.
                        </span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}