import { useState } from 'react';

export const useAdicionarItemComanda = () => {
    const [isLoading, setIsLoading] = useState(false);

    const adicionarItem = async (dados) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/Posts/CadItemComanda/itemComanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });
            
            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || "Erro ao adicionar item" };
            }

            return { success: true, data };
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    return { adicionarItem, isLoading };
};
