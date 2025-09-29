import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useProdutoById = (produto_id) => {
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduto = useCallback(async () => {
    if (!produto_id) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/Gets/GetProdutoById/${produto_id}`);
      
      console.log("Resposta da API:", response.data);
      
      const produtoData = Array.isArray(response.data) 
        ? response.data[0] 
        : response.data;    
      
      console.log("Produto extraído:", produtoData);
      setProduto(produtoData);
      
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setProduto(null);
    } finally {
      setIsLoading(false);
    }
  }, [produto_id]);

  useEffect(() => {
    fetchProduto();
  }, [fetchProduto]);

  return { produto, isLoading, fetchProduto };
};