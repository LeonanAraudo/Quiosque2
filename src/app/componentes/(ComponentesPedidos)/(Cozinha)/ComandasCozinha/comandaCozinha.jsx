"use client"
import { useRouter } from "next/navigation"
import { useComandas } from "../../../../../../hook/Comandas/useComandas"

export default function ComandaCozinha() {
    const router = useRouter()
    const { comandas, isLoading } = useComandas()

    const handleComandaClick = (comanda_id) => {
        router.push(`/Telas/ItensComandaCozinha/${comanda_id}`)
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-4">
            <div className="w-full h-[10%] flex items-center justify-start my-6">
                <h1 className="text-2xl font-bold text-gray-800">Comandas</h1>
            </div>
            {isLoading ? (
                <div className="w-full h-[90%] flex flex-col items-center justify-center">
                    <div className=" w-[90%] h-16 rounded flex items-center justify-center mx-6">
                        <p>Carregando...</p>
                    </div>
                </div>
            ) : (
                <div className="w-full h-[90%] flex flex-col items-center justify-start space-y-4 overflow-y-auto">
                    {comandas.map((comanda) => (
                        <div key={comanda.comanda_id} className="w-full flex flex-col items-center justify-center">
                            <div 
                                className="bg-[#00187A] text-white w-[90%] h-16 rounded-[20px] flex items-center justify-center mx-6 shadow-lg cursor-pointer hover:bg-[#0020A0] transition-colors"
                                onClick={() => handleComandaClick(comanda.comanda_id)}
                            >
                                <p className="text-lg font-semibold">Pedido - {comanda.numerocomanda}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}