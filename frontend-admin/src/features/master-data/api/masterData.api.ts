import { api } from '../../../lib/http'; // Sesuaikan path jika berbeda

// --- GET ALL ---
export const fetchMasterDataApi = async (category: string) => {
    if (category === 'instansi') {
        // Sesuai dokumen: GET /instansi/getAllInstansi
        const { data } = await api.get('/instansi/getAllInstansi');
        return data; // Axios otomatis membungkus JSON backend ke dalam 'data'
    } else {
        // Asumsi general-master pakai rute standar
        const { data } = await api.get(`/master/${category}`);
        return data.data || data; 
    }
};

// --- CREATE ---
export const createMasterDataApi = async (category: string, payload: any) => {
    if (category === 'instansi') {
        // Sesuai dokumen: POST /instansi/createInstansi
        const { data } = await api.post('/instansi/createInstansi', payload);
        return data;
    } else {
        const { data } = await api.post(`/master/${category}`, payload);
        return data.data || data;
    }
};

// --- UPDATE ---
export const updateMasterDataApi = async (category: string, id: string, payload: any) => {
    if (category === 'instansi') {
        // Sesuai dokumen: PUT /instansi/updateInstansi/:id
        const { data } = await api.put(`/instansi/updateInstansi/${id}`, payload);
        return data;
    } else {
        const { data } = await api.put(`/master/${category}/${id}`, payload);
        return data.data || data;
    }
};

// --- DELETE ---
export const deleteMasterDataApi = async (category: string, id: string) => {
    if (category === 'instansi') {
        // Sesuai dokumen: DELETE /instansi/deleteInstansi/:id
        const { data } = await api.delete(`/instansi/deleteInstansi/${id}`);
        return data;
    } else {
        const { data } = await api.delete(`/master/${category}/${id}`);
        return data;
    }
};