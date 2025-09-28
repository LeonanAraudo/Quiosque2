"use client"
import { roboto } from "@/app/Fontes/fonts"
import { useState } from "react";
import AlertDialogDemo from './modalConfirmDelete'
import { useComandaActions } from "../../../../../../hook/Comandas/useComandaActions"

export default function ButtonsComanda({comanda_id}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { enviarParaCozinha, finalizarComanda, isLoading } = useComandaActions();

    const handleEnviarCozinha = async () => {
        const result = await enviarParaCozinha(comanda_id);
        if (result.success) {
            console.log(result.message);
            // Aqui você pode adicionar notificação de sucesso
        } else {
            console.error(result.message);
            // Aqui você pode adicionar notificação de erro
        }
    };

    const handleFinalizar = async () => {
        const result = await finalizarComanda(comanda_id);
        if (result.success) {
            console.log(result.message);
            // Aqui você pode adicionar notificação de sucesso
        } else {
            console.error(result.message);
            // Aqui você pode adicionar notificação de erro
        }
    };

    return (
        <div className={`${roboto.className}`}>
            <div className="w-full flex flex-row items-center justify-around">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-[#E20A0A] w-24 h-8 text-white text-xl rounded-sm"
                >
                    Apagar
                </button>
                <button 
                    onClick={handleEnviarCozinha}
                    disabled={isLoading}
                    className="bg-[#1056B1] w-48 h-8 text-white text-xl rounded-sm disabled:opacity-50"
                >
                    {isLoading ? "Enviando..." : "Enviar para cozinha"}
                </button>
                <button 
                    onClick={handleFinalizar}
                    disabled={isLoading}
                    className="bg-[#2FD520] w-20 h-8 text-white text-xl rounded-sm disabled:opacity-50"
                >
                    {isLoading ? "..." : "$"}
                </button>
            </div>
            {showConfirm && (
                <>
                <AlertDialogDemo 
                comanda_id={comanda_id}
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                />
                </>
            )}
        </div>
    )
}