import { useState } from 'react';
import axios from 'axios';

export const useDeleteFicha = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletar = async (ficha_id) => {
        try {
            setIsLoading(true);
            setError(null);
            await axios.delete(`/api/Delete/DeleteFichaById/${ficha_id}`);
            return true;
        } catch (err) {
            console.error('Erro ao deletar ficha:', err);
            setError(err.response?.data?.error || 'Erro ao deletar ficha');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { deletar, isLoading, error };
};
