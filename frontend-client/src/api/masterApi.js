import { api } from '../lib/http';

export const getMaster = async (kategori) => {
  const res = await api.get(`/master/${kategori}`);
  return res.data?.data || [];
};

export const getAllInstansi = async () => {
  const res = await api.get('/instansi/getAllInstansi');
  return res.data || [];
};
