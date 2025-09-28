import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        async function fetchCategorias() {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/Gets/getCategory');
                setCategorias(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                setCategorias([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategorias();
    }, [isMounted]);

    return { categorias, isLoading };
};
