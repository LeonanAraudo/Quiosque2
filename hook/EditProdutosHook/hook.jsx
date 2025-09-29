"use client";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function patchProdutos(produto_id, refreshProdutos, onSuccess) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Helper para adicionar se existir
      const appendIfExists = (key, value) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== "Invalid date"
        ) {
          formData.append(key, value);
        }
      };

      appendIfExists("nome", data.nome);
      appendIfExists("descricao", data.descricao);
      appendIfExists("marca", data.marca);
      appendIfExists("fornecedor", data.fornecedor);
      appendIfExists("modelo", data.modelo);
      appendIfExists("categorias", data.categorias);
      appendIfExists("preco_compra", data.preco_compra);
      appendIfExists("preco_venda", data.preco_venda);
      appendIfExists("quantidade_disponivel", data.quantidade_disponivel);
      appendIfExists("quantidade_minima", data.quantidade_minima);

      if (
        data.data_vencimento &&
        !isNaN(Date.parse(data.data_vencimento))
      ) {
        formData.append("data_vencimento", data.data_vencimento);
      }

      // Imagem
      if (data.foto && data.foto[0]) {
        formData.append("foto", data.foto[0]);
      }

      const response = await axios.patch(
        `/api/Patch/PatchProdutosById/${produto_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Produto atualizado com sucesso:", response.data);
      refreshProdutos?.();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  return { register, onSubmit, handleSubmit, setValue };
}
