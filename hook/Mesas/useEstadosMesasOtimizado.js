import { useState, useEffect } from 'react';

export const useEstadosMesasOtimizado = (mesas) => {
    const [estadosMesas, setEstadosMesas] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mesas || mesas.length === 0) return;

        async function getEstadosMesas() {
            try {
                setIsLoading(true);
                
                // Faz apenas 1 requisição para buscar todas as comandas
                const response = await fetch('/api/Gets/GetAllComandas/getAllComandas');
                
                if (response.ok) {
                    const todasComandas = await response.json();
                    
                    // Cria um mapa com os estados das mesas
                    const estadosMap = {};
                    
                    // Inicializa todas as mesas como "fechada"
                    mesas.forEach(mesa => {
                        estadosMap[mesa] = { estado: undefined, comanda_id: null };
                    });
                    
                    // Atualiza apenas as mesas que têm comandas abertas
                    todasComandas.forEach(comanda => {
                        if (comanda.mesa && comanda.estado === "aberta") {
                            estadosMap[comanda.mesa] = { 
                                estado: comanda.estado, 
                                comanda_id: comanda.comanda_id 
                            };
                        }
                    });
                    
                    setEstadosMesas(estadosMap);
                } else {
                    // Se der erro, inicializa todas as mesas como fechadas
                    const estadosMap = {};
                    mesas.forEach(mesa => {
                        estadosMap[mesa] = { estado: undefined, comanda_id: null };
                    });
                    setEstadosMesas(estadosMap);
                }
            } catch (error) {
                console.error('Erro ao buscar estados das mesas:', error);
                // Em caso de erro, inicializa todas as mesas como fechadas
                const estadosMap = {};
                mesas.forEach(mesa => {
                    estadosMap[mesa] = { estado: undefined, comanda_id: null };
                });
                setEstadosMesas(estadosMap);
            } finally {
                setIsLoading(false);
            }
        }

        getEstadosMesas();
    }, [mesas]); // Voltou a incluir mesas nas dependências

    return { estadosMesas, isLoading };
};