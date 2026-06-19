import { useState, useEffect, useCallback } from 'react';
import { usersApi } from '../api/users.api';
import type { User, UserFormData } from '../types/users.types';
import Swal from 'sweetalert2';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await usersApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
      alert("Gagal mengambil data user dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (formData: UserFormData) => {
    setIsSubmitting(true);
    try {
      await usersApi.createUser(formData);
      alert(`User ${formData.username} berhasil ditambahkan!`); // <-- Ubah name ke username
      await fetchUsers(); 
      return true; 
    } catch (error: any) {
      alert(`Gagal menambah user: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateUser = async (id: number, formData: UserFormData) => {
    setIsSubmitting(true);
    try {
      const payload: Partial<UserFormData> = { ...formData };
      if (!payload.password) delete payload.password;

      await usersApi.updateUser(id, payload);
      alert(`Data user ${formData.username} berhasil diperbarui!`); // <-- Ubah name ke username
      await fetchUsers();
      return true;
    } catch (error: any) {
      alert(`Gagal mengubah user: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (id: number) => {
    const isConfirm = await Swal.fire({
      title: "Yakin hapus user?",
      text: "Data user yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600",
        cancelButton: "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2",
      },
    });
    if (!isConfirm.isConfirmed) return;

    try {
      await usersApi.deleteUser(id);
      alert("User berhasil dihapus.");
      await fetchUsers();
    } catch (error: any) {
      alert(`Gagal menghapus user: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
  };

  return { users, isLoading, isSubmitting, createUser, updateUser, deleteUser };
};