import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFichas = () => {
    const [fichas, setFichas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fetchFichas = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/Gets/GetFichas/getFichas');
            setFichas(response.data);
        } catch (error) {
            console.error('Erro ao buscar fichas:', error);
            setFichas([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isMounted) return;
        fetchFichas();
    }, [isMounted]);

    return { fichas, isLoading, refetch: fetchFichas };
};
