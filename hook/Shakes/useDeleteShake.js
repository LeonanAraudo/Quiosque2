"use client";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function useDeleteShake() {
    const { register, handleSubmit } = useForm()

    const onSubmit = async ({ shake_id }) => {
        const promise = axios.delete(`/api/Delete/DeleteShakeById/${shake_id}`);

        toast.promise(
            promise,
            {
                pending: "Entregando shake...",
                success: "Shake entregue com sucesso!",
                error: "Erro ao entregar o shake.",
            }
        );

        try {
            await promise;
            window.location.reload();
        } catch (error) {
            console.error("Erro ao Entregar o shake :", error);
        }
    };

    return { onSubmit, register, handleSubmit };
}
