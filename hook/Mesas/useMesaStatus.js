import { useState, useEffect } from 'react';

export const useMesaStatus = (mesa) => {
    const [estadoMesa, setEstadoMesa] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mesa) return;

        async function getEstadoComanda() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/Gets/GetComandaAberta/${mesa}`);
                if (response.ok) {
                    const data = await response.json();
                    setEstadoMesa(data.estado || undefined);
                } else {
                    setEstadoMesa(undefined);
                }
            } catch (error) {
                console.error('Erro ao buscar estado da mesa:', error);
                setEstadoMesa(undefined);
            } finally {
                setIsLoading(false);
            }
        }

        getEstadoComanda();
    }, [mesa]);

    return { estadoMesa, isLoading };
};
