import { useState } from 'react';
import axios from 'axios';

export const useCadastrarFicha = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const cadastrar = async (nome_produto, quantidade) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post('/api/Posts/CadFicha/cadastrarFicha', {
                nome_produto,
                quantidade: Number(quantidade)
            });
            return response.data;
        } catch (err) {
            console.error('Erro ao cadastrar ficha:', err);
            setError(err.response?.data?.error || 'Erro ao cadastrar ficha');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { cadastrar, isLoading, error };
};
