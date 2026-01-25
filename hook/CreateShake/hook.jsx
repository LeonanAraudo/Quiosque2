"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

/**
 * Hook unificado para criar shake
 * @param {Object} options - Opções do hook
 * @param {string} [options.comanda_id] - ID da comanda (opcional)
 * @param {string} [options.redirectTo] - URL para redirecionar após sucesso (opcional)
 */
export default function useCreateShake({ comanda_id, redirectTo } = {}) {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  
  const onSubmit = async (formData) => {
    const payload = { ...formData };
    if (comanda_id) payload.comanda_id = comanda_id;
    
    const promise = axios.post("/api/Posts/CadShake/shakeOptions", payload);

    toast.promise(
      promise,
      {
        pending: "Cadastrando shake...",
        success: "Shake cadastrado com sucesso!",
        error: "Erro ao cadastrar o shake.",
      }
    );

    try {
      await promise;
      reset();
      
      if (redirectTo) {
        router.push(redirectTo);
      } else if (comanda_id) {
        router.push(`/Telas/Comanda/${comanda_id}`);
      } else {
        router.push(`/Telas/ShakeOptions2`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar o shake:", error);
    }
  };

  return { onSubmit, register, handleSubmit };
}
