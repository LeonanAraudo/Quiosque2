import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useProdutoById = (produto_id) => {
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduto = useCallback(async () => {
    if (!produto_id) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/Gets/GetProdutoById/${produto_id}`);
      setProduto(response.data);
      console.log("aqui o response", response.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setProduto(null);
    } finally {
      setIsLoading(false);
    }
  }, [produto_id]);

  useEffect(() => {
    fetchProduto();
  }, []);

  return { produto, isLoading, fetchProduto };
};
