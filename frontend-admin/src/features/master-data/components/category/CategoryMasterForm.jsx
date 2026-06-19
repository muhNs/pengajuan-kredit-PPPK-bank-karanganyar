import React, { useEffect, useState } from 'react';

const emptyForm = { label: '', kode: '', aktif: true };

export default function CategoryMasterForm({
    initialData = null,
    onSubmit,
    onCancel,
    nameLabel,
    submitLabel,
}) {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            label: form.label.trim(),
            kode: form.kode.trim().toUpperCase(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kode <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.kode}
                    onChange={(e) => setForm({ ...form, kode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border rounded-2xl font-mono focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                    <p className="font-medium">Status Aktif</p>
                    <p className="text-sm text-gray-500">Item aktif akan muncul di dropdown</p>
                </div>
                <button
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, aktif: !current.aktif }))}
                    className={`w-12 h-6 rounded-full relative transition-all ${form.aktif ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.aktif ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-3 border rounded-2xl">
                    Batal
                </button>
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
                    {initialData ? 'Simpan Perubahan' : `Tambah ${submitLabel}`}
                </button>
            </div>
        </form>
    );
}
