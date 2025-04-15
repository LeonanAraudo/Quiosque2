"use client"
import axios from "axios";
import { useForm } from "react-hook-form";

export default function patchProdutos(produto_id,refreshProdutos ){
    const {register, handleSubmit, formState: { errors }} = useForm();

    const formatData = (data) => {
        const dados = {
          nome: data.nome || undefined,
          quantidade_disponivel: data.quantidade_disponivel ? parseInt(data.quantidade_disponivel) : undefined,
          quantidade_minima: data.quantidade_minima ? parseInt(data.quantidade_minima) : undefined,
          preco_compra: data.preco_compra ? parseFloat(data.preco_compra) : undefined,
          preco_venda: data.preco_venda ? parseFloat(data.preco_venda) : undefined,
          data_vencimento: data.data_vencimento ? new Date(data.data_vencimento) : undefined,
          descricao: data.descricao || undefined,
          marca: data.marca || undefined,
          fornecedor: data.fornecedor || undefined,
          modelo: data.modelo || undefined,
        };
      
        // Remove os campos que estão undefined
        Object.keys(dados).forEach(key => {
          if (dados[key] === undefined) {
            delete dados[key];
          }
        });
      
        return dados;
      };

    const onSubmit = async (data) => {
        const dadosFormatados = formatData(data);
        try{
            const response = await axios.patch(`/api/PatchProdutosById/${produto_id}`,dadosFormatados)
            console.log('Produto atualizado com sucesso:', response.data);
            if (refreshProdutos) {
                refreshProdutos();
              }
        }catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    }
    
    return { register, onSubmit, handleSubmit }
}