import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProdutoById = (produto_id) => {
    const [produto, setProduto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !produto_id) return;

        async function fetchProduto() {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/Gets/GetProdutoById/${produto_id}`);
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                setProduto(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduto();
    }, [isMounted, produto_id]);

    return { produto, isLoading };
};
