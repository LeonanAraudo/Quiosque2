import { useState, useEffect } from 'react';

export const useItensComanda = (comanda_id) => {
    const [itens, setItens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !comanda_id) return;

        async function fetchItens() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/Gets/GeTitemComanda/${comanda_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();

                if (data && data.success && Array.isArray(data.itens)) {
                    setItens(data.itens);
                } else {
                    setItens([]);
                }
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
                setItens([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchItens();
        // Atualizar a cada 30 segundos
        const interval = setInterval(fetchItens, 30000);
        return () => clearInterval(interval);
    }, [isMounted, comanda_id]);

    return { itens, isLoading };
};
