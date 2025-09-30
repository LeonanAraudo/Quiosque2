import { useState, useEffect } from 'react';

export const useShakeById = (shake_id) => {
    const [shake, setShake] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!shake_id || isNaN(shake_id)) {
            console.error('useShakeById - shake_id inválido:', shake_id);
            setIsLoading(false);
            setShake(null);
            return;
        }

        async function fetchShake() {
            console.log('useShakeById - Buscando shake:', shake_id);
            try {
                setIsLoading(true);
                const response = await fetch(`/api/Gets/GetShakeById/${shake_id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data && data.shake_id) {
                    setShake(data);
                } else {
                    console.error('Dados do shake inválidos:', data);
                    setShake(null);
                }
            } catch (error) {
                console.error('Erro ao buscar shake:', error);
                setShake(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchShake();
    }, [shake_id]);

    return { shake, isLoading };
};
