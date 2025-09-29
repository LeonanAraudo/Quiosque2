"use client"
import { useEffect, useState } from "react";

export default function PagamentoComponent({ comanda_id }) {
  const [totalSalvo, setTotalSalvo] = useState(null);

  useEffect(() => {
    const valor = localStorage.getItem(`total_comanda_${comanda_id}`);
    setTotalSalvo(valor);
  }, [comanda_id]);

  return (
    <>
      <p>O total da comanda é {totalSalvo ? `R$ ${totalSalvo}` : "carregando..."}</p>
    </>
  );
}
