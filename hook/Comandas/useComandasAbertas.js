import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar comandas em aberto (sem mesa fixa)
 * Retorna comandas abertas que não têm mesa associada ou têm mesa > 10
 */
export const useComandasAbertas = () => {
    const [comandasAbertas, setComandasAbertas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComandasAbertas = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch('/api/Gets/GetAllComandas/getAllComandas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            // Filtra apenas comandas abertas sem mesa fixa (mesa > 10 ou null)
            const comandasFiltradas = Array.isArray(data) 
                ? data.filter(comanda => 
                    comanda.estado === 'aberta' && 
                    (!comanda.mesa || comanda.mesa > 10)
                  )
                : [];

            setComandasAbertas(comandasFiltradas);
        } catch (err) {
            console.error('Erro ao buscar comandas abertas:', err);
            setError(err.message || 'Erro ao buscar comandas');
            setComandasAbertas([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComandasAbertas();
        
        // Atualiza a cada 10 segundos
        const interval = setInterval(fetchComandasAbertas, 10000);
        
        return () => clearInterval(interval);
    }, [fetchComandasAbertas]);

    const refetch = useCallback(() => {
        fetchComandasAbertas();
    }, [fetchComandasAbertas]);

    return { 
        comandasAbertas, 
        isLoading, 
        error,
        refetch 
    };
};
