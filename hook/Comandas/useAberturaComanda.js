import { useState } from 'react';

export const useAberturaComanda = () => {
    const [isLoading, setIsLoading] = useState(false);

    const abrirComanda = async (mesa) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/Posts/AberturaComanda/aberturaComanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mesa,
                    estado: "aberta",
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return { success: true, comanda_id: data.comanda_id };
            } else {
                console.error("Erro ao abrir comanda");
                return { success: false, error: "Erro ao abrir comanda" };
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    return { abrirComanda, isLoading };
};
