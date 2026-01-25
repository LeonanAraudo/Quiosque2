"use client";

import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import entregarItemComandaPorShakeId from "./entregarItemComandaPorShakeId";

export default function useEntregarShake() {
    const { register, handleSubmit } = useForm()


    const onSubmit = async ({ shake_id }) => {
        const promise = (async () => {
            await axios.patch(`/api/Patch/PatchEntregueShake/${shake_id}`, { entregue: true });
            await entregarItemComandaPorShakeId(shake_id);
        })();

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
            console.error("Erro ao entregar o shake:", error);
        }
    };

    return { onSubmit, register, handleSubmit };
}
