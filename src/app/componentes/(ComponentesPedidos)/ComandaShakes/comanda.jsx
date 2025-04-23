"use client";

import { useEffect, useState } from "react";
import { roboto, robotoBold } from "@/app/Fontes/fonts";
import axios from "axios";

export default function Comanda() {
  const [shakes, setShakes] = useState([]);

  const fetchShakes = async () => {
    try {
      const response = await axios.get("/api/GetAllShakes/getshakes");
      // Ordena os shakes por data de criação
      const sortedShakes = response.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setShakes(sortedShakes);
    } catch (error) {
      console.error("Erro ao buscar shakes:", error);
    }
  };

  useEffect(() => {
    fetchShakes();
  }, []);

  const handleEntregar = async (shakeId) => {
    try {
      await axios.delete(`/api/DeleteShakeById/${shakeId}`);
      fetchShakes(); 
    } catch (error) {
      console.error("Erro ao deletar shake:", error);
    }
  };

  return (
    <div className="w-full h-auto mt-14 flex flex-col items-center justify-center gap-4">
      {shakes.map((shake, index) => (
        <div
          key={shake.shake_id}
          className="bg-[#FFD0B7] w-[95%] h-full flex items-center justify-center rounded-[5px] flex-col gap-2 px-2"
        >
          <div className="w-full flex items-center justify-between">
            <p className={`text-[30px] text-[#780000] ${robotoBold.className}`}>
              {shake.nome}
            </p>
            <p className={`text-[50px] text-[#780000] ${robotoBold.className}`}>
              {shake.numero_comanda}
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-3">
            <InfoItem
              icon="https://img.icons8.com/ios-filled/50/milkshake.png"
              titulo="Tamanho"
              valor={shake.tamanho}
              roboto={roboto}
              robotoBold={robotoBold}
            />
            <InfoItem
              icon="https://img.icons8.com/metro/26/mortar-and-pestle.png"
              titulo="Sabor"
              valor={shake.sabor}
              roboto={roboto}
              robotoBold={robotoBold}
            />
            <InfoItem
              icon="https://img.icons8.com/ios-filled/50/pastry-bag.png"
              titulo="Cobertura"
              valor={shake.cobertura}
              roboto={roboto}
              robotoBold={robotoBold}
            />
            <InfoItem
              icon="https://img.icons8.com/ios-filled/50/spoon-of-sugar.png"
              titulo="Adicionais"
              valor={shake.adicionais}
              roboto={roboto}
              robotoBold={robotoBold}
            />
          </div>

          <div className="w-full h-5 pr-2 flex items-center justify-end flex-row my-6">
            <button
              className={`active:bg-[#7eec68] bg-[#21BA03] w-[180px] h-10 rounded-[5px] text-[19px] text-white ${roboto.className}`}
              onClick={() => handleEntregar(shake.shake_id)}
            >
              Entregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoItem({ icon, titulo, valor, roboto, robotoBold }) {
  return (
    <div className="bg-[#FFE8DB] w-full h-16 rounded-[5px] shadow-lg flex flex-row">
      <div className="w-[15%] h-full flex items-center justify-center">
        <img width="30" height="30" src={icon} alt={titulo} />
      </div>
      <div className="h-full w-[85%] flex items-center justify-center flex-col text-center">
        <p className={`text-[19px] ${robotoBold.className}`}>{titulo}</p>
        <p className={`text-[19px] ${roboto.className}`}>{valor}</p>
      </div>
    </div>
  );
}
