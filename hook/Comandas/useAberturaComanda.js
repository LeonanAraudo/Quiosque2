import { useState, useCallback } from 'react';

/**
 * Hook para abrir comanda
 * @returns {Object} { abrirComanda, isLoading, error }
 */
export const useAberturaComanda = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const abrirComanda = useCallback(async (mesa) => {
        try {
            setIsLoading(true);
            setError(null);

            // Validação de entrada
            if (mesa !== null && mesa !== undefined) {
                if (typeof mesa !== 'number' || !Number.isInteger(mesa) || mesa < 0) {
                    const errorMsg = "Mesa deve ser um número inteiro positivo ou null";
                    setError(errorMsg);
                    return { success: false, error: errorMsg };
                }
            }

            const response = await fetch("/api/Posts/AberturaComanda/aberturaComanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mesa: mesa ?? null,
                    estado: "aberta",
                }),
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                return { 
                    success: true, 
                    comanda_id: data.comanda_id,
                    numerocomanda: data.numerocomanda
                };
            } else {
                const errorMsg = data.message || "Erro ao abrir comanda";
                setError(errorMsg);
                console.error("Erro ao abrir comanda:", data);
                return { success: false, error: errorMsg };
            }
        } catch (error) {
            const errorMsg = error.message || "Erro na requisição";
            setError(errorMsg);
            console.error("Erro na requisição:", error);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { abrirComanda, isLoading, error };
};
