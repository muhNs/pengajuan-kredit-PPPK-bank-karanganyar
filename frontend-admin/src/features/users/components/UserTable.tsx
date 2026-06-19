import { UserPlus, Edit, Trash2, Users as UsersIcon } from "lucide-react";
import type { UserTableProps } from "../types/users.types";

// Tambahkan prop isLoading jika Anda ingin mem-passing loading state ke tabel
export default function UserTable({
  users,
  onAdd,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    // ... Layout Header Anda (sama persis dengan yang Anda buat) ...
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      {/* Tombol Add & Title sama persis */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UsersIcon size={24} className="text-gray-700" /> Manajemen User
          </h1>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-yellow-400 text-[#1a1c2d] px-5 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm"
        >
          <UserPlus size={18} /> <span>Tambah User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Lengkap</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Hak Akses</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700 border border-purple-200" : "bg-blue-100 text-blue-700 border border-blue-200"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    {" "}
                    {/* Tambah gap-2 agar tombol tidak menempel */}
                    <button
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Belum ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
