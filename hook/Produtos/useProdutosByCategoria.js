import { useState, useEffect } from 'react';

export const useProdutosByCategoria = (categorias) => {
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
                const url = categorias ? `/api/Gets/getCategory/${categorias}` : '/api/Gets/GetProdutos/produtos';
                const response = await fetch(url);
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setProdutos([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProdutos();
    }, [isMounted, categorias]);

    return { produtos, isLoading };
};
