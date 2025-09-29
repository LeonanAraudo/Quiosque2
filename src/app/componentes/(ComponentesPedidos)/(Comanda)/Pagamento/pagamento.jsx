"use client"
import { useEffect, useState } from "react";
import { roboto, robotoBold } from "../../../../Fontes/fonts";
import { useDeleteComandas } from "../../../../../../hook/Comandas/useComandaDeleteById";
import { useRouter } from "next/navigation";

export default function PagamentoComponent({ comanda_id }) {
  const [totalSalvo, setTotalSalvo] = useState(null);
  const { deletarComanda, isLoading } = useDeleteComandas()
  const router = useRouter()

  async function delComanda() {
    const result = await deletarComanda(comanda_id);
    if (result.success) {
      localStorage.removeItem(`total_comanda_${comanda_id}`);
      router.push("/Telas/Mesas");
    } else {
      alert(result.error);
    }
  }
  useEffect(() => {
    const valor = localStorage.getItem(`total_comanda_${comanda_id}`);
    setTotalSalvo(valor);
  }, [comanda_id]);

  return (
    <>
      <div className="w-full h-[90%] flex items-center justify-center flex-col">
        <div className="bg-[#F5F5F5] w-[90%] h-[80%] rounded-xl">
          <div className="w-full flex items-center justify-center flex-col">
            <p className={`font-bold text-[20px] mt-3 ${roboto.className}`}>Total da Comanda</p>
            <p className={`font-bold text-[40px] mt-2 ${robotoBold.className}`}> {totalSalvo ? `R$ ${totalSalvo}` : "carregando..."}</p>
          </div>
          <div>
            <img />
          </div>
        </div>
        <div className="w-full flex items-start justify-start">
          <button
            onClick={delComanda}
            disabled={isLoading}
            className="bg-[#E20A0A] h-8 text-white text-xl ml-5 mt-8 rounded-sm"
          >
            Finalizar Comanda
          </button>
        </div>
      </div>
    </>
  );
}
