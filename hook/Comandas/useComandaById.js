import { useState, useEffect } from 'react';

export const useComandaById = (comanda_id) => {
    const [comanda, setComanda] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !comanda_id) return;

        async function fetchComanda() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/Gets/GetComandaById/${comanda_id}`);
                const data = await response.json();
                setComanda(data);
            } catch (error) {
                console.error('Erro ao buscar comanda:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchComanda();
    }, [isMounted, comanda_id]);

    return { comanda, isLoading };
};
