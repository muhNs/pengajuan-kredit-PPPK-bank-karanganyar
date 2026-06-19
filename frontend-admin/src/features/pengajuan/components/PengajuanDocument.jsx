import React, { useRef, useState, useEffect } from 'react';
import { formatCurrency } from '../utils/pengajuanUtils';

// Custom hook for scroll reveal animation
const useScrollReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
        );
        
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return { ref, isVisible };
};

const SectionCard = ({ title, children }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref} className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.99] active:shadow-sm cursor-pointer group">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 group-hover:bg-gray-100/50 transition-colors duration-300">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-[#FFC800] rounded-full group-hover:scale-110 transform transition-transform duration-300"></div>
                        {title}
                    </h3>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// [BARU] Helper untuk gaya status di background gelap
const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Disetujui': 
            return 'bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
        case 'Ditolak': 
            return 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
        case 'Sedang Diproses': 
            return 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
        default: // Menunggu Review
            return 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
    }
};

const HeaderDocument = ({ pengajuan }) => {
    const { ref, isVisible } = useScrollReveal();
    
    // Ambil status dari data riil, fallback ke Menunggu Review
    const currentStatus = pengajuan.status || 'Menunggu Review';
    const statusStyle = getStatusBadgeStyle(currentStatus);

    return (
        <div ref={ref} className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95'}`}>
            <div className="bg-gradient-to-r from-[#0B1121] to-gray-900 rounded-2xl shadow-md overflow-hidden text-white mb-8 border-b-4 border-[#FFC800] transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.99] active:shadow-sm cursor-pointer">
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-[#FFC800]/20 p-2 rounded-lg backdrop-blur-sm border border-[#FFC800]/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFC800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Permohonan Pengajuan Kredit</h1>
                        </div>
                        <p className="text-gray-400 font-medium">PT BPR Bank Karanganyar (Perseroda)</p>
                    </div>
                    
                    {/* BAGIAN KANAN: STATUS & TANGGAL */}
                    <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                        {/* [BARU] BADGE STATUS MENCOLOK */}
                        <div className={`px-5 py-2 rounded-full border backdrop-blur-md flex items-center gap-2 font-bold tracking-wide transition-colors ${statusStyle}`}>
                            {/* Titik indikator menyala */}
                            <span className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus === 'Disetujui' ? 'bg-green-400' : currentStatus === 'Ditolak' ? 'bg-red-400' : currentStatus === 'Sedang Diproses' ? 'bg-blue-400' : 'bg-amber-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStatus === 'Disetujui' ? 'bg-green-500' : currentStatus === 'Ditolak' ? 'bg-red-500' : currentStatus === 'Sedang Diproses' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                            </span>
                            {currentStatus}
                        </div>

                        {/* KOTAK TANGGAL */}
                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-right w-full sm:w-auto sm:min-w-[180px]">
                            <div className="text-sm text-gray-400 mb-1">Tanggal Pengajuan</div>
                            <div className="font-bold text-lg text-[#FFC800]">
                                {/* Antisipasi format DB (created_at) atau format dummy sebelumnya (date) */}
                                {pengajuan.created_at ? new Date(pengajuan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : (pengajuan.date || '-')}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const DataField = ({ label, value, fullWidth = false }) => (
    <div className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</span>
        <span className="text-sm font-medium text-gray-900 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100 break-words min-h-[42px] flex items-center">
            {value || '-'}
        </span>
    </div>
);

export default function PengajuanDocument({ pengajuan }) {
    if (!pengajuan) return null;

    const formatRupiah = (value) => {
        if (!value) return '-';
        return `Rp ${formatCurrency(value).replace('Rp', '').trim()}`;
    };

    return (
        <div className="w-full mx-auto space-y-6 pb-12 font-sans overflow-x-hidden p-1">
            
            {/* Header Document */}
            <HeaderDocument pengajuan={pengajuan} />

            {/* DATA PRIBADI PEMOHON */}
            <SectionCard title="Data Pribadi Pemohon">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <DataField label="Nama Lengkap Sesuai KTP" value={pengajuan.data_diri?.nama_lengkap} />
                    <DataField label="Nomor Handphone" value={pengajuan.data_diri?.no_handphone} />
                    <DataField label="Tanda Pengenal (KTP) Nomor" value={pengajuan.data_diri?.nik} />

                    <DataField label="Tempat Tinggal" value={pengajuan.data_diri?.alamat} fullWidth />

                    <DataField label="Kode Pos" value={pengajuan.data_diri?.kode_pos} />
                    <DataField label="Status Rumah" value={pengajuan.data_diri?.status_rumah?.kepemilikan} />
                    <DataField label="Status Pernikahan" value={pengajuan.data_diri?.status_pernikahan?.status} />

                    <DataField label="Jenis Kelamin" value={pengajuan.data_diri?.jenis_kelamin?.gender} />
                    <DataField label="NPWP" value={pengajuan.data_diri?.npwp} />
                    <DataField label="Pekerjaan" value={pengajuan.data_pekerjaan?.divisi} />

                    <DataField label="Nama Gadis Ibu Kandung" value={pengajuan.data_diri?.nama_ibu_kandung} />
                </div>
            </SectionCard>

            {/* DATA KHUSUS */}
            <SectionCard title="Data Instansi / Pekerjaan">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <DataField label="Nama Instansi" value={pengajuan.data_pekerjaan?.instansi?.nama_instansi} />
                    <DataField label="Jabatan dalam pekerjaan" value={pengajuan.data_pekerjaan?.jabatan} />
                    <DataField label="Alamat Instansi / Kantor" value={pengajuan.data_pekerjaan?.instansi?.alamat} fullWidth />
                </div>
            </SectionCard>

            <SectionCard title="Data Kerabat Pemohon">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <DataField label="Nama Lengkap Kerabat Sesuai KTP" value={pengajuan.data_diri?.nama_kerabat} />
                    <DataField label="Nomor Handphone" value={pengajuan.data_diri?.no_handphone_kerabat} />
                    <DataField label="Tanda Pengenal (KTP) Nomor" value={pengajuan.data_diri?.nik_kerabat} />
                    <DataField label="Tempat Tinggal" value={pengajuan.data_diri?.alamat_kerabat} fullWidth />
                </div>
            </SectionCard>

            {/* DATA KREDIT */}
            <SectionCard title="Data Kredit">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <DataField label="Jumlah Kredit Diajukan" value={formatRupiah(pengajuan.nominal)} />
                    <DataField label="Jangka Waktu" value={pengajuan.tenor ? `${pengajuan.tenor} Bulan` : '-'} />
                    <DataField label="Penghasilan Tetap (Bulan)" value={formatRupiah(pengajuan.data_pekerjaan?.pendapatan_tetap)} />
                    <DataField label="Penghasilan Tambahan" value={formatRupiah(pengajuan.data_pekerjaan?.pendapatan_tidak_tetap)} />

                    <DataField label="Kredit digunakan untuk" value={pengajuan.tujuan_kredit} fullWidth />
                </div>
            </SectionCard>

            {/* DATA JAMINAN */}
            <SectionCard title="Data Jaminan">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <DataField label="Jaminan Utama" value={pengajuan.berkas_pendukung?.document_type || 'SK Pegawai dan Ijazah Terakhir'} />
                    <DataField label="Atas Nama (Jaminan Utama)" value={pengajuan.data_diri?.nama_lengkap} />
                    
                    <DataField label="Jaminan Tambahan" value={pengajuan.jaminan_tambahan} />
                    <DataField label="Atas Nama (Jaminan Tambahan)" value={pengajuan.jaminan_tambahan_atas_nama} />
                    
                    <DataField label="Nama Orang Terdekat / Darurat" value={pengajuan.data_penjamin?.nama} fullWidth />
                </div>
            </SectionCard>

            {/* IDENTITAS PASANGAN & PENJAMIN */}
            <SectionCard title="Identitas Pasangan & Penjamin">
                <div className="space-y-8">
                    {/* Pasangan Debitur */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-xs">1</span> 
                            Istri / Suami Kreditur
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            <DataField label="Nama Lengkap" value={pengajuan.data_pasangan?.nama} />
                            <DataField label="Nomor KTP" value={pengajuan.data_pasangan?.nik} />
                            <DataField label="Alamat" value={pengajuan.data_pasangan?.alamat} />
                        </div>
                    </div>

                    {/* Penjamin */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-xs">2</span> 
                            Penjamin
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            <DataField label="Nama Lengkap" value={pengajuan.data_penjamin?.nama} />
                            <DataField label="Nomor KTP" value={pengajuan.data_penjamin?.nik} />
                            <DataField label="Alamat" value={pengajuan.data_penjamin?.alamat} />
                        </div>
                    </div>

                    {/* Pasangan Penjamin */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-xs">3</span> 
                            Istri / Suami Penjamin
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            <DataField label="Nama Lengkap" value={pengajuan.nama_pasangan_penjamin} />
                            <DataField label="Nomor KTP" value={pengajuan.no_ktp_pasangan_penjamin} />
                            <DataField label="Alamat" value={pengajuan.alamat_pasangan_penjamin} />
                        </div>
                    </div>
                </div>
                
                {/* Persetujuan SLIK */}
                <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-5 text-sm text-blue-900 leading-relaxed flex gap-4 items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <span className="font-bold block mb-1">Persetujuan SLIK (Sistem Layanan Informasi Keuangan)</span>
                        Dengan ini menyatakan bahwa debitur dan pihak terkait mengizinkan PT BPR Bank Karanganyar (Perseroda) untuk melakukan analisa SLIK atas data/identitas sehubungan dengan pengajuan kredit pada Bank tersebut. Pernyataan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
                    </div>
                </div>
            </SectionCard>

        </div>
    );
}