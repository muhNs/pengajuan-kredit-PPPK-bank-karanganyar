import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Step1DataDiri from '../component/Step1DataDiri';
import Step2DataSuamiIstri from '../component/Step2DataSuamiIstri';
import Step3DataOrangTerdekat from '../component/Step3DataOrangTerdekat';
import Step4DataPegawaiPendapatan from '../component/Step4DataPegawaiPendapatan';
import Step5PengajuanKredit from '../component/Step5PengajuanKredit';
import Step6UploadBerkas from '../component/Step6UploadBerkas';
import TemplateCetakF4 from './TemplateCetakF4';
import { usePengajuan } from '../hooks/usePengajuan';

const INITIAL_FORM_DATA = {
    // Step 1 — nama field harus sama dengan atribut `name` di komponen Step1DataDiri
    nama: '', email: '', nik: '', npwp: '', no_telp: '', alamat: '', kode_pos: '', nama_ibu: '',
    status_rumah_id: '', status_pernikahan_id: '', jenis_kelamin_id: '', nama_kerabat: '', nik_kerabat: '', alamat_kerabat: '', telp_kerabat: '',
    // Step 2 (Opsional)
    nama_pasangan: '', nik_pasangan: '', alamat_pasangan: '', telp_pasangan: '',
    // Step 3 — nama field harus sama dengan atribut `name` di komponen Step3DataOrangTerdekat
    nama_penjamin: '', nik_penjamin: '', alamat_penjamin: '', telp_penjamin: '', penjamin_hubungan_kerabat: '',
    nama_pasangan_penjamin: '', nik_pasangan_penjamin: '', alamat_pasangan_penjamin: '', telp_pasangan_penjamin: '',
    // Step 4 — nama field harus sama dengan atribut `name` di komponen Step4DataPegawaiPendapatan
    instansi: '', jabatan: '', nip: '', pendapatan_tetap: '', pendapatan_tidak_tetap: '',
    // Step 5
    penggunaan_kredit: '', nominal_kredit: '', tenor_kredit: '',
    // Step 6 (Files)
    file_ktp: null, file_kk: null, file_ktp_pasangan: null, file_surat_nikah: null, file_ijazah: null, file_sk: null, file_npwp: null
};

const STEPS = [
    { id: 1, title: 'Data Diri' },
    { id: 2, title: 'Pasangan' },
    { id: 3, title: 'Penjamin' },
    { id: 4, title: 'Pekerjaan' },
    { id: 5, title: 'Pinjaman' },
    { id: 6, title: 'Berkas' }
];

export default function FormPengajuan() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    // MENGGUNAKAN CUSTOM HOOK
    const { masterOptions, isLoadingMaster, isSubmitting, error, submitData } = usePengajuan();

    const handleNext = async () => {
        // JIKA BERADA DI LANGKAH TERAKHIR (SUBMIT)
        if (step === 6) {
            // Validasi file wajib
            if (!formData.file_ktp || !formData.file_kk || !formData.file_sk || !formData.file_ijazah) {
                alert("Mohon lengkapi semua dokumen wajib (KTP, KK, SK, Ijazah) sebelum mengirim.");
                return;
            }

            // Validasi Persetujuan
            if (!formData.setuju_pernyataan) {
                alert("Anda harus mencentang kotak persetujuan syarat dan ketentuan sebelum mengirim pengajuan.");
                return;
            }

            const payload = new FormData();

            // 1. Data Diri
            payload.append("nama_lengkap", formData.nama);
            payload.append("alamat", formData.alamat);
            payload.append("kode_pos", formData.kode_pos);
            payload.append("no_handphone", formData.no_telp);
            payload.append("email", formData.email);
            payload.append("nik", formData.nik);
            if (formData.npwp) payload.append("npwp", formData.npwp);
            payload.append("nama_ibu_kandung", formData.nama_ibu);
            // FIX: baca dari formData.status_pernikahan_id (sesuai name= di Step1DataDiri)
            payload.append("status_pernikahan_id", formData.status_pernikahan_id);
            payload.append("status_rumah_id", formData.status_rumah_id);
            payload.append("jenis_kelamin_id", formData.jenis_kelamin_id);
            payload.append("nama_kerabat", formData.nama_kerabat);
            payload.append("nik_kerabat", formData.nik_kerabat);
            payload.append("alamat_kerabat", formData.alamat_kerabat);
            payload.append("no_handphone_kerabat", formData.telp_kerabat);

            // 2. Data Pasangan
            if (formData.nama_pasangan) payload.append("pasangan_nama", formData.nama_pasangan);
            if (formData.alamat_pasangan) payload.append("pasangan_alamat", formData.alamat_pasangan);
            if (formData.nik_pasangan) payload.append("pasangan_nik", formData.nik_pasangan);
            if (formData.telp_pasangan) payload.append("pasangan_no_telepon", formData.telp_pasangan);

            // 3. Data Penjamin
            payload.append("penjamin_nama", formData.nama_penjamin);
            payload.append("penjamin_alamat", formData.alamat_penjamin);
            payload.append("penjamin_nik", formData.nik_penjamin);
            payload.append("penjamin_no_telepon", formData.telp_penjamin);
            payload.append("penjamin_hubungan_kerabat", formData.penjamin_hubungan_kerabat);
            // FIX: nama key harus sesuai Zod schema backend (penjamin_nama_pasangan, dst)
            if (formData.nama_pasangan_penjamin) payload.append("penjamin_nama_pasangan", formData.nama_pasangan_penjamin);
            if (formData.nik_pasangan_penjamin) payload.append("penjamin_nik_pasangan", formData.nik_pasangan_penjamin);
            if (formData.alamat_pasangan_penjamin) payload.append("penjamin_alamat_pasangan", formData.alamat_pasangan_penjamin);
            if (formData.telp_pasangan_penjamin) payload.append("penjamin_no_telepon_pasangan", formData.telp_pasangan_penjamin);

            // 4. Data Pekerjaan
            payload.append("instansi_id", formData.instansi);
            payload.append("jabatan", formData.jabatan);
            payload.append("nip", formData.nip);
            payload.append("pendapatan_tetap", formData.pendapatan_tetap.replace(/\D/g, ''));
            payload.append("pendapatan_tidak_tetap", formData.pendapatan_tidak_tetap ? formData.pendapatan_tidak_tetap.replace(/\D/g, '') : "0");

            // 5. Data Pinjaman
            payload.append("tujuan_kredit", formData.penggunaan_kredit);
            payload.append("nominal", formData.nominal_kredit.replace(/\D/g, ''));
            payload.append("tenor", formData.tenor_kredit);

            // 6. Berkas File
            payload.append("KTP_KREDITUR", formData.file_ktp);
            payload.append("KK", formData.file_kk);
            payload.append("SK", formData.file_sk);
            payload.append("IJASAH_TERAKHIR", formData.file_ijazah);
            if (formData.file_ktp_pasangan) payload.append("KTP_PASANGAN", formData.file_ktp_pasangan);
            if (formData.file_surat_nikah) payload.append("SURAT_NIKAH", formData.file_surat_nikah);
            if (formData.file_npwp) payload.append("SURAT_NPWP", formData.file_npwp);

            // Eksekusi API
            const success = await submitData(payload);
            
            if (success) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(error || "Gagal mengirim pengajuan. Coba lagi.");
            }
            return;
        }

        setDirection(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => prev - 1);
    };

    const renderStep = () => {
        const props = { formData, setFormData, masterOptions };
        switch (step) {
            case 1: return <Step1DataDiri {...props} />;
            case 2: return <Step2DataSuamiIstri {...props} />;
            case 3: return <Step3DataOrangTerdekat {...props} />;
            case 4: return <Step4DataPegawaiPendapatan {...props} />;
            case 5: return <Step5PengajuanKredit {...props} />;
            case 6: return <Step6UploadBerkas {...props} />;
            default: return null;
        }
    };

    // UI TAMPILAN LOADING DATA MASTER
    if (isLoadingMaster) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Memuat Formulir Pengajuan...</div>;
    }

    // UI HALAMAN SUCCESS (Cetak PDF)
    if (isSuccess) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Bagian ini disembunyikan saat print/export PDF */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-[#152042] print:hidden">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-[#152042]">Pengajuan Berhasil Dikirim!</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                        Terima kasih, data dan dokumen pengajuan kredit Anda telah kami terima dan sedang dalam antrean verifikasi oleh tim analis kami.
                    </p>
                    <div className="bg-[#FFC800]/10 border border-[#FFC800]/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                        <h3 className="font-semibold text-lg mb-2">Langkah Selanjutnya:</h3>
                        <p className="text-sm text-gray-600">
                            Silakan <strong>cetak dokumen PDF</strong> di bawah ini. Dokumen tersebut wajib ditandatangani oleh Anda, pasangan (jika ada), dan penjamin di atas materai, lalu diserahkan kepada CS BPR Karanganyar saat pencairan dana.
                        </p>
                    </div>
                    
                    {/* TOMBOL CETAK MENGARAH KE TEMPLATE */}
                    <div className="flex justify-center mb-10">
                        <button
                            onClick={() => window.print()}
                            className="bg-[#152042] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1a2853] transition-all flex items-center gap-2 shadow-lg shadow-[#152042]/20"
                        >
                            <FileText className="w-5 h-5" />
                            Cetak Dokumen Formulir (PDF)
                        </button>
                    </div>
                </div>

                {/* TEMPLATE RENDER DISINI UNTUK DIPRINT */}
                <TemplateCetakF4 formData={formData} masterOptions={masterOptions} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto w-full relative pb-24 pt-8 md:pt-12 px-4 md:px-0">
            {/* PROGRESS BAR CARD */}
            <div className="mb-8 md:mb-10 w-full bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative pb-6 md:pb-0">
                    {/* Garis Latar Belakang */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                    
                    {/* Garis Progress */}
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-[#FFC800] -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                    ></div>
                    
                    {/* Lingkaran Steps */}
                    <div className="relative flex justify-between">
                        {STEPS.map((s) => (
                            <div key={s.id} className="flex flex-col items-center relative z-10">
                                <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300 border-[3px] md:border-4 border-white ${
                                    step >= s.id ? 'bg-[#FFC800] text-[#0B1121] shadow-lg shadow-[#FFC800]/20' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {step > s.id ? <CheckCircle size={16} strokeWidth={3} className="md:w-[18px] md:h-[18px]" /> : s.id}
                                </div>
                                <span className={`absolute top-10 md:top-12 text-[10px] md:text-xs font-semibold text-center w-14 md:w-auto md:whitespace-nowrap ${
                                    step >= s.id ? 'text-[#0B1121]' : 'text-gray-400'
                                } ${step === s.id ? 'block' : 'hidden sm:block'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    ⚠️ {typeof error === 'string' ? error : 'Terjadi kesalahan. Silakan coba lagi.'}
                </div>
            )}

            {/* RENDER FORMS */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>

            {/* NAVIGATION BUTTONS */}
            <div className="mt-auto pt-6 md:pt-8 flex justify-between gap-3 md:gap-4 w-full">
                <button
                    type="button"
                    onClick={handleBack}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 md:py-3.5 rounded-xl h-12 md:h-[52px] text-sm md:text-base font-semibold shrink-0 transition-all ${
                        step === 1 
                        ? 'opacity-0 pointer-events-none' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                    }`}
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    Kembali
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting || (step === 6 && !formData.setuju_pernyataan)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-8 py-3 md:py-3.5 rounded-xl h-12 md:h-[52px] text-sm md:text-base font-bold shrink-0 transition-all ${
                        (step === 6 && !formData.setuju_pernyataan)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                            : isSubmitting
                                ? 'bg-[#FFC800] text-[#0B1121] opacity-70 cursor-not-allowed shadow-lg shadow-[#FFC800]/20'
                                : 'bg-[#FFC800] text-[#0B1121] hover:bg-[#F0BC00] shadow-lg shadow-[#FFC800]/20'
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#0B1121]/20 border-t-[#0B1121] rounded-full animate-spin" />
                            <span className="text-sm md:text-base">Memproses...</span>
                        </div>
                    ) : (
                        <>
                            {step === 6 ? 'Kirim Pengajuan' : 'Selanjutnya'}
                            {step < 6 && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}