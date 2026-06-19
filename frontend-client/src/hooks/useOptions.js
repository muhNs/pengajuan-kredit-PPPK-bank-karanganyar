import { useEffect, useState } from 'react';
import { getMaster, getAllInstansi } from '../api/masterApi';

// simple in-memory cache to avoid repeated network calls
const cache = {
  master: {},
  instansi: null,
};

export function useMasterOptions(kategori, labelField) {
  const [options, setOptions] = useState(() => cache.master[kategori] || []);
  const [loading, setLoading] = useState(!cache.master[kategori]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (cache.master[kategori]) {
      setOptions(cache.master[kategori]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getMaster(kategori)
      .then((list) => {
        const mapped = (list || []).map((item) => ({ value: item.id, label: item[labelField] || item.nama || item.status || item.gender || '' }));
        cache.master[kategori] = mapped;
        if (mounted) setOptions(mapped);
      })
      .catch((err) => {
        if (mounted) setError(err?.message || 'Gagal memuat data');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [kategori, labelField]);

  return { options, loading, error };
}

export function useInstansiOptions() {
  const [options, setOptions] = useState(() => cache.instansi || []);
  const [loading, setLoading] = useState(!cache.instansi);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (cache.instansi) {
      setOptions(cache.instansi);
      setLoading(false);
      return;
    }

    setLoading(true);
    getAllInstansi()
      .then((list) => {
        const mapped = (list || []).map((item) => ({ value: item.id, label: item.nama_instansi }));
        cache.instansi = mapped;
        if (mounted) setOptions(mapped);
      })
      .catch((err) => {
        if (mounted) setError(err?.message || 'Gagal memuat instansi');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return { options, loading, error };
}
