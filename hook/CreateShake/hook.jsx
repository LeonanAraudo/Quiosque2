"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function createShake() {
  const {register, handleSubmit,reset} = useForm()
  const router = useRouter();

  const onSubmit = async (formData) => {
    const promise =  axios.post("/api/CadShake/shakeOptions", formData);

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
      reset()
      router.push("/Telas/ShakeOptions");
    } catch (error) {
      console.error("Erro ao cadastrar o shake :", error);
    }
  };

  return { onSubmit,register,handleSubmit };
}
