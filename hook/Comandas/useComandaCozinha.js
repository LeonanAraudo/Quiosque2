import { useState } from 'react';

export const useComandaCozinha = () => {
  const [comandas, setComandas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchComandas(comanda_id) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/Patch/PatchComandaCozinha/${comanda_id}`, {
        method: 'PATCH',
      });
      const data = await response.json();
      setComandas(data);
    } catch (error) {
      console.error('Erro ao atualizar comanda:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { comandas, isLoading, fetchComandas };
};
