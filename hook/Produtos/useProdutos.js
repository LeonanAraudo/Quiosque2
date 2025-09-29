import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        async function fetchProdutos() {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/Gets/GetProdutos/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setProdutos([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProdutos();
    }, [isMounted]);

    return { produtos, isLoading };
};
