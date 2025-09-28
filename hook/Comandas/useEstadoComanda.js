import { useState } from 'react';

export const useEstadoComanda = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getEstadoComanda = async (mesa) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/Gets/GetComandaAberta/${mesa}`);
            const data = await response.json();
            
            if (response.ok) {
                return { 
                    success: true, 
                    estado: data.estado, 
                    comanda_id: data.comanda_id 
                };
            } else {
                return { 
                    success: false, 
                    estado: undefined, 
                    comanda_id: null 
                };
            }
        } catch (error) {
            console.error("Erro no getComanda", error);
            return { 
                success: false, 
                estado: undefined, 
                comanda_id: null 
            };
        } finally {
            setIsLoading(false);
        }
    };

    return { getEstadoComanda, isLoading };
};
