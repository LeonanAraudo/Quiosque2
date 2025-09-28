import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAllShakes = () => {
    const [shakes, setShakes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        async function fetchShakes() {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/Gets/GetAllShakes/getshakes');
                setShakes(response.data);
            } catch (error) {
                console.error('Erro ao buscar shakes:', error);
                setShakes([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchShakes();
    }, [isMounted]);

    return { shakes, isLoading };
};
