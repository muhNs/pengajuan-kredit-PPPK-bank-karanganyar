import { Save, ArrowLeft, Edit, UserPlus } from 'lucide-react';
import type { UserFormProps } from '../types/users.types';

export default function UserForm({ isEditing, isLoading, formData, onChange, onSubmit, onBack }: UserFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-3xl mx-auto">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? <Edit size={20} className="text-[#1a1c2d]" /> : <UserPlus size={20} className="text-[#1a1c2d]" />}
          <h2 className="font-semibold text-gray-800">{isEditing ? 'Edit Data User' : 'Form Tambah User'}</h2>
        </div>
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Kembali
        </button>
      </div>
      <form onSubmit={onSubmit} className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Username Lengkap</label>
          {/* Ubah name="name" dan value={formData.name} menjadi username */}
          <input type="text" name="username" required value={formData.username} onChange={onChange} placeholder="Masukkan username" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Akses</label>
          <input type="email" name="email" required value={formData.email} onChange={onChange} placeholder="email@bprkaranganyar.co.id" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {isEditing ? 'Password Baru (Kosongkan jika tidak ingin diubah)' : 'Password'}
          </label>
          <input type="password" name="password" required={!isEditing} value={formData.password} onChange={onChange} placeholder="Minimal 6 karakter" minLength={6} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Hak Akses (Role)</label>
          <select name="role" required value={formData.role} onChange={onChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="ADMIN">ADMIN</option>
            <option value="CS">CS</option>
          </select>
        </div>
        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-yellow-400 text-[#1a1c2d] px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? <span className="text-sm">Menyimpan...</span> : <><Save size={18} /><span className="text-sm">{isEditing ? 'Simpan Perubahan' : 'Simpan User Baru'}</span></>}
          </button>
        </div>
      </form>
    </div>
  );
}