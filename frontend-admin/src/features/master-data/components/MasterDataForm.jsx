import React, { useState, useEffect } from 'react';

export default function MasterDataForm({ initialData = null, onSubmit, onCancel, categoryLabel }) {
    const [label, setLabel] = useState('');
    const [errors, setErrors] = useState({});

    // Isi form jika mode edit
    useEffect(() => {
        if (initialData) {
            // Mengambil dari label atau nama (karena sudah dinormalisasi di store)
            setLabel(initialData.label || initialData.nama || '');
        } else {
            setLabel('');
        }
        setErrors({});
    }, [initialData]);

    const validate = () => {
        const errs = {};
        if (!label.trim()) errs.label = `Nama ${categoryLabel} wajib diisi.`;
        else if (label.trim().length < 2) errs.label = 'Minimal terdiri dari 2 karakter.';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        
        // Cukup kirim { label: "..." }, nanti Store yang akan mengubahnya jadi "nama" untuk API
        onSubmit({ label: label.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Nama {categoryLabel} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder={`Masukkan nama ${categoryLabel?.toLowerCase()}...`}
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.label
                            ? 'border-red-400 focus:ring-red-200 bg-red-50'
                            : 'border-gray-200 focus:ring-[#152042]/20 focus:border-[#152042] bg-white'
                    }`}
                />
                {errors.label && <p className="mt-1 text-xs text-red-500">{errors.label}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 text-sm font-bold border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-bold rounded-xl bg-[#152042] hover:bg-[#0B1171] text-white transition-all shadow-md shadow-[#152042]/20 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                    {initialData ? 'Simpan Perubahan' : 'Tambah Data'}
                </button>
            </div>
        </form>
    );
}