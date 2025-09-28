import { useState, useEffect } from 'react';
import axios from 'axios';

export const useShakeById = (shake_id) => {
    const [shake, setShake] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !shake_id) return;

        async function fetchShake() {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/Gets/GetShakeById/${shake_id}`);
                
                if (response.data && response.data.shake_id) {
                    setShake(response.data);
                } else {
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
    }, [isMounted, shake_id]);

    return { shake, isLoading };
};
