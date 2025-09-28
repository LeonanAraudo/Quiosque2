"use client"
import { roboto } from "@/app/Fontes/fonts"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMesaEstados, useEstadoComanda, useAberturaComanda } from "../../../../../hook"

export default function MesasFixas() {
    const router = useRouter()
    const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [modalAberto, setModalAberto] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState(null)
    
    const { estadoMesa, isLoading: loadingEstados } = useMesaEstados(mesas)
    const { getEstadoComanda } = useEstadoComanda()
    const { abrirComanda, isLoading: loadingAbertura } = useAberturaComanda()

    async function handleMesaClick(mesa) {
        const result = await getEstadoComanda(mesa);
        if (result.success && result.estado === "aberta") {
            router.push(`/Telas/Comanda/${result.comanda_id}`);
        } else {
            setMesaSelecionada(mesa);
            setModalAberto(true);
        }
    }

    async function handleAberturaComanda(mesa) {
        const result = await abrirComanda(mesa);
        if (result.success) {
            router.push(`/Telas/Comanda/${result.comanda_id}`);
        }
    }

    function handleConfirmar() {
        if (mesaSelecionada !== null) {
            handleAberturaComanda(mesaSelecionada);
        }
        setModalAberto(false);
    }

    return (
        <div className={`${roboto.className}`}>
            <div className="grid grid-cols-2 gap-4 p-4">
                {mesas.map((mesa) => {
                    const estados = estadoMesa[mesa]
                    const corBotao = estados === "aberta" ? "bg-[#1AA2A7]" : "bg-[#36A71A]"
                    return (
                        <button
                            key={mesa}
                            onClick={() => handleMesaClick(mesa)}
                            className={`${corBotao} text-white p-6 rounded-lg flex items-center justify-center`}
                            disabled={loadingEstados || loadingAbertura}
                        >
                            <p className="text-[27px]">{mesa}</p>
                        </button>
                    )
                })}
            </div>
            {
                modalAberto && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-black text-center">
                            <p className="mb-4">Deseja abrir a comanda número {mesaSelecionada}?</p>
                            <div className="flex w-full items-center justify-between">
                                <button
                                    onClick={() => setModalAberto(false)}
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmar}
                                    className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}
