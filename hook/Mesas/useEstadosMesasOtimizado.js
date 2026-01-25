import { useState, useEffect, useCallback } from 'react';

/**
 * Hook otimizado para buscar estados de múltiplas mesas
 * Faz apenas 1 requisição para todas as comandas
 */
export const useEstadosMesasOtimizado = (mesas) => {
    const [estadosMesas, setEstadosMesas] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const getEstadosMesas = useCallback(async () => {
        // Validação de entrada
        if (!mesas || !Array.isArray(mesas) || mesas.length === 0) {
            setIsLoading(false);
            return;
        }

        // Validar que todas as mesas são números válidos
        const mesasValidas = mesas.every(mesa => 
            typeof mesa === 'number' && Number.isInteger(mesa) && mesa > 0
        );

        if (!mesasValidas) {
            console.error('Mesas inválidas fornecidas ao hook');
            setError('Mesas inválidas');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            
            // Timeout de 10 segundos para a requisição
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch('/api/Gets/GetAllComandas/getAllComandas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const todasComandas = await response.json();
            
            if (!Array.isArray(todasComandas)) {
                throw new Error('Resposta inválida da API');
            }
            
            // Inicializa todas as mesas como "fechada"
            const estadosMap = {};
            mesas.forEach(mesa => {
                estadosMap[mesa] = { estado: undefined, comanda_id: null };
            });
            
            // Atualiza apenas as mesas que têm comandas abertas
            todasComandas.forEach(comanda => {
                if (comanda?.mesa && 
                    typeof comanda.mesa === 'number' && 
                    comanda.estado === "aberta" &&
                    comanda.comanda_id) {
                    estadosMap[comanda.mesa] = { 
                        estado: comanda.estado, 
                        comanda_id: comanda.comanda_id 
                    };
                }
            });
            
            setEstadosMesas(estadosMap);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            console.error('Erro ao buscar estados das mesas:', err);
            setError(err.message || 'Erro ao buscar estados');
            
            // Retry logic (max 3 tentativas)
            if (retryCount < 3 && err.name !== 'AbortError') {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 2000 * (retryCount + 1)); // Exponential backoff
            } else {
                // Em caso de erro após retries, inicializa todas como fechadas
                const estadosMap = {};
                mesas.forEach(mesa => {
                    estadosMap[mesa] = { estado: undefined, comanda_id: null };
                });
                setEstadosMesas(estadosMap);
            }
        } finally {
            setIsLoading(false);
        }
    }, [mesas, retryCount]);

    useEffect(() => {
        getEstadosMesas();
    }, [getEstadosMesas]);

    return { estadosMesas, isLoading, error, refetch: getEstadosMesas };
};