import { useState, useEffect } from 'react';

export const useComandas = () => {
    const [comandas, setComandas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        async function fetchComandas() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/Gets/GetAllComandas/getAllComandas');
                const data = await response.json();
                setComandas(data);
            } catch (error) {
                console.error('Erro ao buscar comandas:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchComandas();
        // Atualizar a cada 30 segundos
        const interval = setInterval(fetchComandas, 30000);
        return () => clearInterval(interval);
    }, [isMounted]);

    return { comandas, isLoading };
};
