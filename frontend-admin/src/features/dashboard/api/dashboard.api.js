import { api } from '../../../lib/http';

const getAnalytics = async () => {
  const response = await api.get('/pengajuan/dashboardAnalytics');
  return response.data;
};

export const dashboardApi = { getAnalytics };