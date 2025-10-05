"use client"
import { roboto, robotoBold } from "../../../../Fontes/fonts"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { useEstadosMesasOtimizado, useAberturaComanda } from "../../../../../../hook"

export default function MesasFixas() {
    const router = useRouter()
    const mesas = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [])

    const [modalAberto, setModalAberto] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState(null)

    const { estadosMesas, isLoading: loadingEstados } = useEstadosMesasOtimizado(mesas)
    const { abrirComanda, isLoading: loadingAbertura } = useAberturaComanda()

    function handleMesaClick(mesa) {
        const estadoMesa = estadosMesas[mesa];
        
        if (estadoMesa && estadoMesa.estado === "aberta") {
            router.push(`/Telas/Comanda/${estadoMesa.comanda_id}`);
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
            <p className={`${robotoBold.className} text-[23px] m-4`}>Comandas</p>
            <div className="grid grid-cols-2 gap-4 p-4">
                {mesas.map((mesa) => {
                    const estadoMesa = estadosMesas[mesa];
                    const corBotao = estadoMesa?.estado === "aberta" ? "bg-[#1AA2A7]" : "bg-[#36A71A]"
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