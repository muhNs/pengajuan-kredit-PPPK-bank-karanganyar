import { useState, useCallback } from 'react';
import { dashboardApi } from '../api/dashboard.api';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.getAnalytics();
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat analitik dashboard server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, refresh: fetchDashboardData };
};