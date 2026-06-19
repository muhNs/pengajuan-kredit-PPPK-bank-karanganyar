import { useState } from "react";
import { buildPengajuanFormData, createPengajuan } from "../api/pengajuanApi";

export function usePengajuan() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const submitPengajuan = async (formData) => {
        setError(null);
        setIsSubmitting(true);

        try {
            const requestPayload = buildPengajuanFormData(formData);
            const result = await createPengajuan(requestPayload);
            setResponse(result.data);
            return result.data;
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.message ||
                "Terjadi kesalahan pada server.";
            setError(message);
            return Promise.reject(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submitPengajuan,
        isSubmitting,
        error,
        response,
    };
}
