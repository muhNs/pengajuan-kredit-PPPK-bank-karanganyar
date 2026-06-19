import React, { useState, useEffect } from 'react';
import { pengajuanApi } from '../api/pengajuan.api'; 

const SelectField = ({ label, name, value, onChange, options, displayKey, disabled = false }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
        <select
            name={name}
            value={value ?? ''}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] transition-all duration-200"
        >
            <option value="">-- Pilih {label} --</option>
            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                    {opt[displayKey]} {/* Menampilkan teks (misal: 'kepemilikan' / 'status' / 'gender') */}
                </option>
            ))}
        </select>
    </div>
);

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '', disabled = false }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || label}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] transition-all duration-200 placeholder-gray-400 disabled:opacity-50"
        />
    </div>
);

const SectionDivider = ({ title }) => (
    <div className="col-span-full flex items-center gap-3 pt-4">
        <div className="w-1.5 h-5 bg-[#FFC800] rounded-full shrink-0"></div>
        <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        <div className="flex-1 h-px bg-gray-100"></div>
    </div>
);

export default function PengajuanEditModal({ pengajuan, onSave, onClose, isSubmitting = false }) {
    const [form, setForm] = useState({});
    
    // --- STATE UNTUK MENAMPUNG OPSI DROP DOWN DARI BACKEND ---
    const [masterData, setMasterData] = useState({
        statusRumah: [],
        statusPernikahan: [],
        jenisKelamin: [],
        instansi: []
    });

    // EFFECT 1: FETCH SEMUA MASTER DATA SAAT MODAL DIBUKA
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await pengajuanApi.getMasterDataForForm();
                setMasterData(data);
            } catch (err) {
                console.error("Gagal memuat opsi dropdown:", err);
            }
        };
        fetchOptions();
    }, []);

    // EFFECT 2: MAPPING DATA RELASIONAL BACKEND KE FLAT STATE FORM
    useEffect(() => {
        if (pengajuan) {
            setForm({
                status: pengajuan.status || 'Menunggu Review',
                nama_lengkap: pengajuan.data_diri?.nama_lengkap || '',
                no_handphone: pengajuan.data_diri?.no_handphone || '',
                nik: pengajuan.data_diri?.nik || '',
                alamat: pengajuan.data_diri?.alamat || '',
                kode_pos: pengajuan.data_diri?.kode_pos || '',
                email: pengajuan.data_diri?.email || '',
                npwp: pengajuan.data_diri?.npwp || '',
                nama_ibu_kandung: pengajuan.data_diri?.nama_ibu_kandung || '',
                
                nama_kerabat: pengajuan.data_diri?.nama_kerabat || '',
                alamat_kerabat: pengajuan.data_diri?.alamat_kerabat || '',
                nik_kerabat: pengajuan.data_diri?.nik_kerabat || '',
                no_handphone_kerabat: pengajuan.data_diri?.no_handphone_kerabat || '',
                
                // Menyimpan ID murninya ke state form agar sinkron dengan HTML <select> value
                status_rumah_id: pengajuan.data_diri?.status_rumah?.id || '',
                status_pernikahan_id: pengajuan.data_diri?.status_pernikahan?.id || '',
                jenis_kelamin_id: pengajuan.data_diri?.jenis_kelamin?.id || '',

                instansi_id: pengajuan.data_pekerjaan?.instansi?.id || '',
                jabatan: pengajuan.data_pekerjaan?.jabatan || '',
                nip: pengajuan.data_pekerjaan?.nip || '',
                divisi: pengajuan.data_pekerjaan?.divisi || '',
                pendapatan_tetap: pengajuan.data_pekerjaan?.pendapatan_tetap || 0,
                pendapatan_tidak_tetap: pengajuan.data_pekerjaan?.pendapatan_tidak_tetap || 0,

                tujuan_kredit: pengajuan.tujuan_kredit || '',
                nominal: pengajuan.nominal || 0,
                tenor: pengajuan.tenor || 0,

                pasangan_nama: pengajuan.data_pasangan?.nama || '',
                pasangan_alamat: pengajuan.data_pasangan?.alamat || '',
                pasangan_nik: pengajuan.data_pasangan?.nik || '',
                pasangan_no_telepon: pengajuan.data_pasangan?.no_telepon || '',

                penjamin_nama: pengajuan.data_penjamin?.nama || '',
                penjamin_alamat: pengajuan.data_penjamin?.alamat || '',
                penjamin_nik: pengajuan.data_penjamin?.nik || '',
                penjamin_no_telepon: pengajuan.data_penjamin?.no_telepon || '',
                penjamin_hubungan_kerabat: pengajuan.data_penjamin?.hubungan_kerabat || '',
                nama_pasangan_penjamin: pengajuan.data_penjamin?.nama_pasangan_penjamin || '',
                alamat_pasangan_penjamin: pengajuan.data_penjamin?.alamat_pasangan_penjamin || '',
                nik_pasangan_penjamin: pengajuan.data_penjamin?.nik_pasangan_penjamin || '',
                no_telepon_pasangan_penjamin: pengajuan.data_penjamin?.no_telepon_pasangan_penjamin || ''
            });
        }
    }, [pengajuan]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        // PENTING: Karena value dari <select> selalu string, kita paksa ubah jadi Number 
        // khusus untuk field ID atau field bertipe angka agar valid di Zod Backend
        const isNumericField = name.endsWith('_id') || type === 'number' || name === 'nominal' || name === 'tenor';
        const finalValue = isNumericField && value !== '' ? Number(value) : value;
        
        setForm(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    if (!pengajuan) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-8 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}
        >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl animate-slide-up my-auto">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#0B1121] to-gray-900 rounded-t-3xl p-6 flex items-center justify-between border-b-4 border-[#FFC800]">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFC800]/20 p-2 rounded-xl border border-[#FFC800]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">Edit Data Pengajuan</h2>
                            <p className="text-gray-400 text-sm">ID Registrasi: #{pengajuan.id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} disabled={isSubmitting} className="text-gray-400 hover:text-white bg-white/10 rounded-xl p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 max-h-[65vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                            <SectionDivider title="Status Berkas & Keputusan" />
                            <SelectField 
                                label="Status Pengajuan" 
                                name="status" 
                                value={form.status} 
                                onChange={handleChange} 
                                // Kita buat options manual karena ini bukan master data relasional, melainkan ENUM/String murni
                                options={[
                                    { id: 'Menunggu Review', label: 'Menunggu Review' },
                                    { id: 'Sedang Diproses', label: 'Sedang Diproses' },
                                    { id: 'Disetujui', label: 'Disetujui' },
                                    { id: 'Ditolak', label: 'Ditolak' }
                                ]} 
                                displayKey="label" // Akan menampilkan label
                                disabled={isSubmitting} 
                            />
                            {/* Kosongkan 2 grid sebelahnya agar status tampil penuh di baris pertama jika diinginkan, atau biarkan mengalir */}
                            <div className="hidden xl:block col-span-2"></div>

                            <SectionDivider title="Data Pribadi Pemohon" />
                            <InputField label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Nomor Handphone" name="no_handphone" value={form.no_handphone} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. KTP (NIK)" name="nik" value={form.nik} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Tempat Tinggal / Alamat" name="alamat" value={form.alamat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Kode Pos" name="kode_pos" value={form.kode_pos} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="NPWP" name="npwp" value={form.npwp} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Nama Gadis Ibu Kandung" name="nama_ibu_kandung" value={form.nama_ibu_kandung} onChange={handleChange} disabled={isSubmitting} />
                            
                            {/* --- DISINI KITA GANTI MENJADI COMPONENT SELECTFIELD --- */}
                            <SelectField 
                                label="Status Rumah" 
                                name="status_rumah_id" 
                                value={form.status_rumah_id} 
                                onChange={handleChange} 
                                options={masterData.statusRumah} 
                                displayKey="kepemilikan" // Sesuai field database prisma: kepemilikan
                                disabled={isSubmitting} 
                            />
                            <SelectField 
                                label="Status Pernikahan" 
                                name="status_pernikahan_id" 
                                value={form.status_pernikahan_id} 
                                onChange={handleChange} 
                                options={masterData.statusPernikahan} 
                                displayKey="status" // Sesuai field database prisma: status
                                disabled={isSubmitting} 
                            />
                            <SelectField 
                                label="Jenis Kelamin" 
                                name="jenis_kelamin_id" 
                                value={form.jenis_kelamin_id} 
                                onChange={handleChange} 
                                options={masterData.jenisKelamin} 
                                displayKey="gender" // Sesuai field database prisma: gender
                                disabled={isSubmitting} 
                            />

                            <SectionDivider title="Data Kerabat Pemohon" />
                            <InputField label="Nama Lengkap Kerabat" name="nama_kerabat" value={form.nama_kerabat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Nomor Handphone Kerabat" name="telp_kerabat" value={form.no_handphone_kerabat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. KTP (NIK) Kerabat" name="nik_kerabat" value={form.nik_kerabat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Tempat Tinggal / Alamat Kerabat" name="alamat_kerabat" value={form.alamat_kerabat} onChange={handleChange} disabled={isSubmitting} />

                            <SectionDivider title="Data Instansi / Pekerjaan" />
                            {/* --- UNTUK INSTANSI JUGA KITA UBAH JADI SELECTFIELD --- */}
                            <SelectField 
                                label="Instansi Tempat Bekerja" 
                                name="instansi_id" 
                                value={form.instansi_id} 
                                onChange={handleChange} 
                                options={masterData.instansi} 
                                displayKey="nama_instansi" // Sesuai field database prisma: nama_instansi
                                disabled={isSubmitting} 
                            />
                            <InputField label="Jabatan" name="jabatan" value={form.jabatan} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="NIP Pekerja" name="nip" value={form.nip} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Divisi / Bagian" name="divisi" value={form.divisi} onChange={handleChange} disabled={isSubmitting} />

                            <SectionDivider title="Data Kredit & Penghasilan" />
                            <InputField label="Jumlah Kredit (Rp)" name="nominal" type="number" value={form.nominal} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Jangka Waktu (Bulan)" name="tenor" type="number" value={form.tenor} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Penghasilan Tetap (Rp)" name="pendapatan_tetap" type="number" value={form.pendapatan_tetap} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Penghasilan Tambahan (Rp)" name="pendapatan_tidak_tetap" type="number" value={form.pendapatan_tidak_tetap} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Kredit Digunakan Untuk" name="tujuan_kredit" value={form.tujuan_kredit} onChange={handleChange} disabled={isSubmitting} />

                            <SectionDivider title="Data Jaminan (ReadOnly)" />
                            <InputField label="Jaminan Utama" name="jaminan_utama" value="SK Pegawai / Dinas" disabled={true} />
                            <InputField label="Atas Nama" name="jaminan_an" value={form.nama_lengkap} disabled={true} />

                            <SectionDivider title="Identitas Pasangan Kreditur (Opsional)" />
                            <InputField label="Nama Pasangan" name="pasangan_nama" value={form.pasangan_nama} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. KTP Pasangan" name="pasangan_nik" value={form.pasangan_nik} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Alamat Pasangan" name="pasangan_alamat" value={form.pasangan_alamat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. Telp Pasangan" name="pasangan_no_telepon" value={form.pasangan_no_telepon} onChange={handleChange} disabled={isSubmitting} />

                            <SectionDivider title="Identitas Penjamin" />
                            <InputField label="Nama Penjamin" name="penjamin_nama" value={form.penjamin_nama} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. KTP Penjamin" name="penjamin_nik" value={form.penjamin_nik} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Alamat Penjamin" name="penjamin_alamat" value={form.penjamin_alamat} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. Telepon Penjamin" name="penjamin_no_telepon" value={form.penjamin_no_telepon} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Hubungan Kerabat" name="penjamin_hubungan_kerabat" value={form.penjamin_hubungan_kerabat} onChange={handleChange} disabled={isSubmitting} />

                            <SectionDivider title="Identitas Pasangan Penjamin" />
                            <InputField label="Nama Pasangan Penjamin" name="nama_pasangan_penjamin" value={form.nama_pasangan_penjamin} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. KTP Pasangan Penjamin" name="nik_pasangan_penjamin" value={form.nik_pasangan_penjamin} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="Alamat Pasangan Penjamin" name="alamat_pasangan_penjamin" value={form.alamat_pasangan_penjamin} onChange={handleChange} disabled={isSubmitting} />
                            <InputField label="No. Telepon Pasangan Penjamin" name="no_telepon_pasangan_penjamin" value={form.no_telepon_pasangan_penjamin} onChange={handleChange} disabled={isSubmitting} />
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Batal</button>
                        <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#0B1121] bg-[#FFC800] hover:bg-yellow-400 shadow-lg flex items-center gap-2 disabled:opacity-50">
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}