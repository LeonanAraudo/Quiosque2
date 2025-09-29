import { useState } from 'react';

export const useEntregarProduto = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchItemComanda(id, entregue) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/Patch/PatchEntregueProduto/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entregue }) 
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao atualizar comanda:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchItemComanda, isLoading };
};
