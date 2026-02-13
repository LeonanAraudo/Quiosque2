import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const logout = async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/Posts/logout/logout');
            
            // Redireciona para o login
            router.push('/Telas/Login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            // Mesmo com erro, redireciona para o login
            router.push('/Telas/Login');
        } finally {
            setIsLoading(false);
        }
    };

    return { logout, isLoading };
};
