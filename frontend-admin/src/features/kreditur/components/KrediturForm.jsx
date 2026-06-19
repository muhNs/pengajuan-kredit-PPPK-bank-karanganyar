import React, { useState, useEffect } from 'react';
import { useMasterDataStore } from '../../master-data/store/masterDataStore';

const STATUS_OPTIONS = ['Diproses', 'Disetujui', 'Ditolak', 'Menunggu Dokumen'];

/**
 * Form Tambah / Edit Kreditur
 * Props:
 *  - initialData: object | null
 *  - onSubmit: (values) => void
 *  - onCancel: () => void
 */
export default function KrediturForm({ initialData = null, onSubmit, onCancel }) {
    const { getActiveByCategory } = useMasterDataStore();

    const jabatanOptions = getActiveByCategory('jabatan');
    const golonganOptions = getActiveByCategory('golongan');
    const dinasOptions = getActiveByCategory('instansi');
    const jenisKreditOptions = getActiveByCategory('sumber-dana'); // Map to sumber-dana as fallback or keep as is if intended
    const agamaOptions = getActiveByCategory('pendidikan'); // Map to pendidikan as fallback or keep as is if intended

    const emptyForm = {
        nip: '', nama: '', jabatan: '', golongan: '', dinas: '',
        no_hp: '', email: '', agama: '', jenis_kredit: '',
        tenor: '', status: 'Diproses', alamat: '',
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
        setErrors({});
    }, [initialData]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => { const e = {...prev}; delete e[field]; return e; });
    };

    const validate = () => {
        const errs = {};
        if (!form.nip.trim()) errs.nip = 'NIP wajib diisi.';
        if (!form.nama.trim()) errs.nama = 'Nama wajib diisi.';
        if (!form.jabatan) errs.jabatan = 'Jabatan wajib dipilih.';
        if (!form.golongan) errs.golongan = 'Golongan wajib dipilih.';
        if (!form.dinas) errs.dinas = 'Dinas wajib dipilih.';
        if (!form.no_hp.trim()) errs.no_hp = 'No. HP wajib diisi.';
        if (!form.tenor || isNaN(Number(form.tenor)) || Number(form.tenor) <= 0)
            errs.tenor = 'Tenor wajib diisi (bulan).';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onSubmit({
            ...form,
            tenor: Number(form.tenor),
        });
    };

    const inputClass = (field) =>
        `w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors[field]
                ? 'border-red-400 focus:ring-red-200 bg-red-50'
                : 'border-gray-200 focus:ring-[#152042]/20 focus:border-[#152042] bg-white'
        }`;

    const selectClass = (field) =>
        `w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white cursor-pointer ${
            errors[field]
                ? 'border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:ring-[#152042]/20 focus:border-[#152042]'
        }`;

    const Label = ({ text, required }) => (
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
            {text} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const Error = ({ field }) => errors[field] ? (
        <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
    ) : null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section: Data Identitas */}
            <div>
                <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#FFC800] rounded flex items-center justify-center text-[#152042] text-[8px] font-black">1</span>
                    Data Identitas
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Label text="NIP" required />
                        <input type="text" value={form.nip} onChange={e => handleChange('nip', e.target.value)}
                            placeholder="Contoh: 199001012020011001" className={`${inputClass('nip')} font-mono`} />
                        <Error field="nip" />
                    </div>
                    <div className="sm:col-span-2">
                        <Label text="Nama Lengkap" required />
                        <input type="text" value={form.nama} onChange={e => handleChange('nama', e.target.value)}
                            placeholder="Nama sesuai KTP" className={inputClass('nama')} />
                        <Error field="nama" />
                    </div>
                    <div>
                        <Label text="Jabatan" required />
                        <select value={form.jabatan} onChange={e => handleChange('jabatan', e.target.value)} className={selectClass('jabatan')}>
                            <option value="">-- Pilih Jabatan --</option>
                            {jabatanOptions.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                        </select>
                        <Error field="jabatan" />
                    </div>
                    <div>
                        <Label text="Golongan" required />
                        <select value={form.golongan} onChange={e => handleChange('golongan', e.target.value)} className={selectClass('golongan')}>
                            <option value="">-- Pilih Golongan --</option>
                            {golonganOptions.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                        </select>
                        <Error field="golongan" />
                    </div>
                    <div className="sm:col-span-2">
                        <Label text="Dinas / SKPD" required />
                        <select value={form.dinas} onChange={e => handleChange('dinas', e.target.value)} className={selectClass('dinas')}>
                            <option value="">-- Pilih Dinas --</option>
                            {dinasOptions.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                        </select>
                        <Error field="dinas" />
                    </div>
                    <div>
                        <Label text="Agama" />
                        <select value={form.agama} onChange={e => handleChange('agama', e.target.value)} className={selectClass('agama')}>
                            <option value="">-- Pilih Agama --</option>
                            {agamaOptions.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <Label text="No. HP" required />
                        <input type="tel" value={form.no_hp} onChange={e => handleChange('no_hp', e.target.value)}
                            placeholder="08xxxxxxxxxx" className={inputClass('no_hp')} />
                        <Error field="no_hp" />
                    </div>
                    <div className="sm:col-span-2">
                        <Label text="Email" />
                        <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                            placeholder="nama@email.com" className={inputClass('email')} />
                    </div>
                    <div className="sm:col-span-2">
                        <Label text="Alamat" />
                        <textarea value={form.alamat} onChange={e => handleChange('alamat', e.target.value)}
                            rows={2} placeholder="Alamat lengkap sesuai KTP"
                            className={`${inputClass('alamat')} resize-none`} />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Section: Data Kredit */}
            <div>
                <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#FFC800] rounded flex items-center justify-center text-[#152042] text-[8px] font-black">2</span>
                    Data Kredit
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label text="Jenis Kredit" />
                        <select value={form.jenis_kredit} onChange={e => handleChange('jenis_kredit', e.target.value)} className={selectClass('jenis_kredit')}>
                            <option value="">-- Pilih Jenis --</option>
                            {jenisKreditOptions.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <Label text="Status Pengajuan" required />
                        <select value={form.status} onChange={e => handleChange('status', e.target.value)} className={selectClass('status')}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <Label text="Tenor (Bulan)" required />
                        <input type="number" value={form.tenor} onChange={e => handleChange('tenor', e.target.value)}
                            placeholder="Contoh: 36" min="1" max="240" className={inputClass('tenor')} />
                        <Error field="tenor" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2 text-sm font-bold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                    Batal
                </button>
                <button type="submit"
                    className="px-5 py-2 text-sm font-bold rounded-lg bg-[#152042] hover:bg-[#0B1171] text-white transition-all shadow-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                    {initialData ? 'Simpan Perubahan' : 'Tambah Kreditur'}
                </button>
            </div>
        </form>
    );
}
