"use client"
import { roboto, robotoBold } from "../../../../Fontes/fonts"
import { useRouter } from "next/navigation"
import { useState, useMemo, useCallback, useEffect } from "react"
import { useEstadosMesasOtimizado, useAberturaComanda, useComandasAbertas } from "../../../../../../hook"

export default function MesasFixas() {
    const router = useRouter()
    const mesas = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [])

    const [modalAberto, setModalAberto] = useState(false)
    const [modalNovaComanda, setModalNovaComanda] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")

    const { estadosMesas, isLoading: loadingEstados } = useEstadosMesasOtimizado(mesas)
    const { abrirComanda, isLoading: loadingAbertura } = useAberturaComanda()
    const { comandasAbertas, isLoading: loadingComandasAbertas, refetch: refetchComandasAbertas } = useComandasAbertas()

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 5000)
            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    const handleMesaClick = useCallback((mesa) => {
        if (typeof mesa !== 'number' || mesa < 1 || mesa > 10) {
            setErrorMessage("Mesa inválida")
            return
        }

        const estadoMesa = estadosMesas[mesa]
        
        if (estadoMesa?.estado === "aberta" && estadoMesa?.comanda_id) {
            router.push(`/Telas/Comanda/${estadoMesa.comanda_id}`)
        } else {
            setMesaSelecionada(mesa)
            setModalAberto(true)
        }
    }, [estadosMesas, router])

    const handleComandaAbertaClick = useCallback((comandaId) => {
        if (!comandaId) {
            setErrorMessage("ID de comanda inválido")
            return
        }
        router.push(`/Telas/Comanda/${comandaId}`)
    }, [router])

    const handleAberturaComanda = useCallback(async (mesa) => {
        try {
            const result = await abrirComanda(mesa)
            
            if (result?.success && result?.comanda_id) {
                refetchComandasAbertas()
                router.push(`/Telas/Comanda/${result.comanda_id}`)
            } else {
                setErrorMessage(result?.error || "Erro ao abrir comanda")
            }
        } catch (error) {
            console.error("Erro ao abrir comanda:", error)
            setErrorMessage("Erro ao processar solicitação")
        }
    }, [abrirComanda, router, refetchComandasAbertas])

    const handleAbrirNovaComanda = useCallback(async () => {
        try {
            const result = await abrirComanda(null)
            
            if (result?.success && result?.comanda_id) {
                refetchComandasAbertas()
                setModalNovaComanda(false)
                router.push(`/Telas/Comanda/${result.comanda_id}`)
            } else {
                setErrorMessage(result?.error || "Erro ao criar comanda")
            }
        } catch (error) {
            console.error("Erro ao criar comanda:", error)
            setErrorMessage("Erro ao processar solicitação")
        }
    }, [abrirComanda, router, refetchComandasAbertas])

    const handleConfirmar = useCallback(() => {
        if (mesaSelecionada !== null && typeof mesaSelecionada === 'number') {
            handleAberturaComanda(mesaSelecionada)
        }
        setModalAberto(false)
    }, [mesaSelecionada, handleAberturaComanda])

    return (
        <div className={`${roboto.className} min-h-screen bg-gray-50 pb-6`}>
            <div className="sticky top-0 bg-white shadow-sm z-10 p-4">
                <h1 className={`${robotoBold.className} text-2xl md:text-3xl`}>
                    Comandas
                </h1>
            </div>

            {errorMessage && (
                <div className="mx-4 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-semibold">⚠️ {errorMessage}</p>
                </div>
            )}

            <section className="p-4">
                <h2 className={`${robotoBold.className} text-xl md:text-2xl mb-4`}>
                    Mesas Fixas
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {mesas.map((mesa) => {
                        const estadoMesa = estadosMesas[mesa]
                        const estaAberta = estadoMesa?.estado === "aberta"
                        const corBotao = estaAberta ? "bg-[#1AA2A7] hover:bg-[#158A8F]" : "bg-[#36A71A] hover:bg-[#2D8A15]"
                        
                        return (
                            <button
                                key={mesa}
                                onClick={() => handleMesaClick(mesa)}
                                className={`${corBotao} text-white p-6 md:p-8 rounded-lg flex flex-col items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={loadingEstados || loadingAbertura}
                                aria-label={`Mesa ${mesa} ${estaAberta ? 'ocupada' : 'disponível'}`}
                            >
                                <span className="text-3xl md:text-4xl font-bold">{mesa}</span>
                                <span className="text-xs md:text-sm mt-2 opacity-90">
                                    {estaAberta ? 'Ocupada' : 'Disponível'}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            <section className="p-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`${robotoBold.className} text-xl md:text-2xl`}>
                        Comandas em Aberto
                    </h2>
                    <button
                        onClick={() => setModalNovaComanda(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-all duration-200 font-semibold text-sm md:text-base"
                        disabled={loadingAbertura}
                        aria-label="Abrir nova comanda"
                    >
                        + Nova Comanda
                    </button>
                </div>

                {loadingComandasAbertas ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Carregando comandas...</p>
                    </div>
                ) : comandasAbertas.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <p className="text-gray-500 text-lg">
                            Nenhuma comanda em aberto no momento
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Clique em "Nova Comanda" para criar uma
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                        {comandasAbertas.map((comanda) => (
                            <button
                                key={comanda.comanda_id}
                                onClick={() => handleComandaAbertaClick(comanda.comanda_id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center"
                                aria-label={`Comanda número ${comanda.numerocomanda}`}
                            >
                                <span className="text-sm opacity-90 mb-1">Comanda</span>
                                <span className="text-3xl font-bold">#{comanda.numerocomanda}</span>
                                {comanda.mesa && (
                                    <span className="text-xs mt-2 opacity-75">
                                        Mesa {comanda.mesa}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {modalAberto && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setModalAberto(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div 
                        className="bg-white p-6 md:p-8 rounded-lg shadow-2xl text-black max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 id="modal-title" className="text-xl font-bold mb-4">
                            Confirmar Abertura
                        </h3>
                        <p className="mb-6 text-gray-700">
                            Deseja abrir a comanda para a mesa <strong>{mesaSelecionada}</strong>?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setModalAberto(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmar}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                                disabled={loadingAbertura}
                            >
                                {loadingAbertura ? 'Abrindo...' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalNovaComanda && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setModalNovaComanda(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-nova-title"
                >
                    <div 
                        className="bg-white p-6 md:p-8 rounded-lg shadow-2xl text-black max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 id="modal-nova-title" className="text-xl font-bold mb-4">
                            Nova Comanda
                        </h3>
                        <p className="mb-6 text-gray-700">
                            Deseja abrir uma nova comanda sem mesa fixa?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setModalNovaComanda(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAbrirNovaComanda}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                                disabled={loadingAbertura}
                            >
                                {loadingAbertura ? 'Criando...' : 'Criar Comanda'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}