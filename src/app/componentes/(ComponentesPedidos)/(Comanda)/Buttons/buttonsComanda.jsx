"use client"
import { roboto } from "@/app/Fontes/fonts"
import { useState } from "react";
import AlertDialogDemo from './modalConfirmDelete'
import { useComandaActions } from "../../../../../../hook/Comandas/useComandaActions"
import { useComandaCozinha } from "../../../../../../hook/Comandas/useComandaCozinha";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function ButtonsComanda({comanda_id}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { enviarParaCozinha, finalizarComanda, isLoading } = useComandaActions();
    const { fetchComandas } = useComandaCozinha(comanda_id);
    const router = useRouter()
    const handleEnviarCozinha = async () => {
        try {
            await fetchComandas(); 
            toast.success("Enviado para a cozinha!"); 
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar para a cozinha");
        }
    };

      const handlePagamento = async () => {
       router.push(`/Telas/Pagamento/${comanda_id}`)
    };

    return (
        <div className={`${roboto.className}`}>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
            />
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
                    onClick={handlePagamento}
                    disabled={isLoading}
                    className="bg-[#2FD520] w-20 h-8 text-white text-xl rounded-sm disabled:opacity-50"
                >
                    {isLoading ? "..." : "$"}
                </button>
            </div>
            {showConfirm && (
                <AlertDialogDemo 
                    comanda_id={comanda_id}
                    isOpen={showConfirm}
                    onClose={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
