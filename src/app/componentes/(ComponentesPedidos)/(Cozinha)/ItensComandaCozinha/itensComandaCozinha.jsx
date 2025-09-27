"use client"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ItensComanda({ comanda_id }){
    const [itens, setItens] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted || !comanda_id) return

        async function fetchItens() {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/Gets/GeTitemComanda/${comanda_id}`)
                const data = await response.json()

                if (data && data.success && Array.isArray(data.itens)) {
                    console.log("Dados dos itens:", data.itens)
                    setItens(data.itens)
                } else {
                    console.log("Dados inválidos:", data)
                    setItens([])
                }
            } catch (error) {
                console.error('Erro ao buscar itens:', error)
                setItens([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchItens()
        // Atualizar a cada 30 segundos
        const interval = setInterval(fetchItens, 30000)
        return () => clearInterval(interval)
    }, [isMounted, comanda_id])

    return(
        <div className="w-full h-full flex flex-col items-center justify-start p-4">
            <div className="w-full h-[10%] flex items-center justify-start my-6">
                <h1 className="text-2xl font-bold text-gray-800">Itens da Comanda</h1>
            </div>
            {isLoading ? (
                <div key={''} className="w-full h-[90%] flex flex-col items-center justify-center">
                    <div className="bg-gray-200 w-[90%] h-16 rounded flex items-center justify-center mx-6">
                        <p>Carregando itens...</p>
                    </div>
                </div>
            ) : (
                <div className="w-full h-[90%] flex flex-col items-center justify-start space-y-4 overflow-y-auto">
                    {itens.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center">
                            <div className="bg-gray-200 w-[90%] h-16 rounded flex items-center justify-center mx-6">
                                <p>Nenhum item encontrado para esta comanda</p>
                            </div>
                        </div>
                    ) : (
                        itens.map((item) => {
                            const isShake = item.shake_id !== null && Object.keys(item.shake).length > 0;
                            const isProduto = item.produto_id !== null && Object.keys(item.produto).length > 0;
                            
                            return (
                                <div key={item.id} className="w-full flex flex-col items-center justify-center">
                                    {isShake ? (
                                        // Div para Shake
                                        <div className="bg-black text-white w-[90%] min-h-16 rounded-[20px] flex items-center justify-between mx-6 shadow-lg p-4">
                                            <div className="w-full flex items-center flex-row justify-between space-x-4">
                                                <div>
                                                    <p className="text-lg font-semibold">{item.shake.nome}</p>
                                                    <p className="text-sm opacity-90">Quantidade: {item.quantidade}</p>
                                                </div>
                                                    <Checkbox className="h-6 w-6 border-white" />
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        // Div para Produto
                                        <div className="bg-white border border-gray-300 w-[90%] min-h-16 rounded-[20px] flex items-center justify-between mx-6 shadow-lg p-4">
                                            <div className="w-full flex items-center flex-row justify-between space-x-4">
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-800">{item.produto.nome}</p>
                                                    <p className="text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                                                </div>
                                                    <Checkbox className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}