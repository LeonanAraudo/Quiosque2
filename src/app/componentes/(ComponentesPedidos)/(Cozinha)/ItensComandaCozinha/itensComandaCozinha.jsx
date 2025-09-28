"use client"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useItensComanda } from "../../../../../../hook/ItensComanda/useItensComanda"

export default function ItensComanda({ comanda_id }){
    const { itens, isLoading } = useItensComanda(comanda_id)

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
                                                    <div>
                                                        <Link href={`/Telas/ShakeComanda/${item.shake.shake_id}`}>
                                                            Detalhes
                                                        </Link>
                                                    </div>
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