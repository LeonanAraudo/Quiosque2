import { useState } from 'react';

export const useDeleteComandas = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletarComanda = async (comanda_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/Delete/DeleteComandaById/${comanda_id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Erro ao deletar comanda' };
      }

      return { success: true };
    } catch (error) {
      console.error('Erro:', error);
      return { success: false, error: 'Erro inesperado ao deletar comanda' };
    } finally {
      setIsLoading(false);
    }
  };

  return { deletarComanda, isLoading };
};
