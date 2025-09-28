import { useState, useEffect } from 'react';

export const useMesaEstados = (mesas) => {
    const [estadoMesa, setEstadoMesa] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mesas || mesas.length === 0) return;

        async function getEstados() {
            const novosEstados = {};
            for (const mesa of mesas) {
                try {
                    const response = await fetch(`/api/Gets/GetComandaAberta/${mesa}`);
                    if (response.ok) {
                        const data = await response.json();
                        novosEstados[mesa] = data.estado || undefined;
                    } else {
                        novosEstados[mesa] = undefined;
                    }
                } catch {
                    novosEstados[mesa] = undefined;
                }
            }
            setEstadoMesa(novosEstados);
            setIsLoading(false);
        }

        getEstados();
    }, [mesas]);

    return { estadoMesa, isLoading };
};
