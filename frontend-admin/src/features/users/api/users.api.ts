import { api } from '../../../lib/http'; // Sesuaikan path dengan lokasi instance axios Anda
import type { User, UserFormData } from '../types/users.types';

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/getAllUsers');
    return response.data.data; // <-- Response API dibungkus dalam "data"
  },

  createUser: async (data: UserFormData): Promise<User> => {
    const response = await api.post('/users/createUser', data);
    return response.data.data; // <-- Response API dibungkus dalam "data"
  },

  updateUser: async (id: number, data: Partial<UserFormData>): Promise<User> => {
    const response = await api.put(`/users/updateUser/${id}`, data);
    return response.data.data; // <-- Response API dibungkus dalam "data"
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    // Sesuai dokumen API terbaru, gunakan method DELETE
    const response = await api.delete(`/users/deleteUser/${id}`); 
    return response.data;
  }
};