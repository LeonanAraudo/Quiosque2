"use client"
import { roboto } from "@/app/Fontes/fonts"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MesasFixas() {
    const router = useRouter()
    const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [modalAberto, setModalAberto] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState(null)
    const [estadoMesa, setEstadoMesa] = useState({})

    useEffect(() => {
        async function getEstados() {
            const novosEstados = {}
            for (const mesa of mesas) {
                try {
                    const response = await fetch(`/api/GetComandaAberta/${mesa}`)
                    if (response.ok) {
                        const data = await response.json()
                        novosEstados[mesa] = data.estado || undefined
                    } else {
                        novosEstados[mesa] = undefined
                    }
                } catch {
                    novosEstados[mesa] = undefined
                }
            }
            setEstadoMesa(novosEstados)
        }
        getEstados()
    }, [])

    async function getEstadoComanda(mesa) {
        try {
            const response = await fetch(`/api/GetComandaAberta/${mesa}`)
            const data = await response.json();
            if (data.estado === "aberta") {
                router.push(`/Telas/comanda/${data.comanda_id}`)
            } else {
                setMesaSelecionada(mesa)
                setModalAberto(true)
            }
        } catch (error) {
            console.log("Erro no getComanda", error)
        }
    }
    
    async function aberturaComanda(mesa) {
        try {
            const response = await fetch("/api/AberturaComanda/aberturaComanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mesa,
                    estado: "aberta",
                }),
            });

            if (response.ok) {
                console.log("Comanda aberta");
                router.push("/Telas/ComandaTela");
            } else {
                console.error("Erro ao abrir comanda");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    function handleConfirmar() {
        if (mesaSelecionada !== null) {
            aberturaComanda(mesaSelecionada)
        }
        setModalAberto(false)
    }

    return (
        <div className={`${roboto.className}`}>
            <div className="grid grid-cols-2 gap-4 p-4">
                {mesas.map((mesa) => {
                    const estados = estadoMesa[mesa]
                    const corBotao = estados === "aberta" ? "bg-[#1AA2A7]" : "bg-[#36A71A]"
                    return(
                    <button
                        key={mesa}
                        onClick={() => getEstadoComanda(mesa)}
                        className={`${corBotao} text-white p-6 rounded-lg flex items-center justify-center`}
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
                            <button
                                onClick={handleConfirmar}
                                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setModalAberto(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    );
}
