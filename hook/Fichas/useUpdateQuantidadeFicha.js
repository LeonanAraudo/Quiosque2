import { useState } from 'react';
import axios from 'axios';

export const useUpdateQuantidadeFicha = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateQuantidade = async (ficha_id, quantidade) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.patch(
                `/api/Patch/PatchQuantidadeFicha/${ficha_id}`,
                { quantidade }
            );
            return response.data;
        } catch (err) {
            console.error('Erro ao atualizar quantidade:', err);
            setError(err.response?.data?.error || 'Erro ao atualizar quantidade');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateQuantidade, isLoading, error };
};
