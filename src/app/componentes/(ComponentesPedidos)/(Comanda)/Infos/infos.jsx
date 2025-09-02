"use client"
import { useEffect, useState } from "react"
import { roboto } from "../../../../Fontes/fonts"
import dayjs from 'dayjs'
export default function Infos({comanda_id}) {
    const [comanda, setComanda] = useState(null); 
    const [tempoAberto, setTempoAberto] = useState("");
    useEffect(() => {
        async function fetchGet(){
            try{
                const response = await fetch(`/api/GetComandaById/${comanda_id}`)
                const data = await response.json()
                setComanda(data)
            }catch(error){
                console.log('Error ao buscar comanda',error)
            }
        }
        fetchGet();
    }, [comanda_id]);

  useEffect(() => {
    if (!comanda) return;
    const intervalo = setInterval(() => {
      const agora = dayjs();
      const inicio = dayjs(comanda.tempo); 
      const diffMinutos = agora.diff(inicio, "minute");
      const horas = Math.floor(diffMinutos / 60);
      const minutos = diffMinutos % 60;
      setTempoAberto(`${horas}h:${minutos}m`);
    }, 1000); 

    return () => clearInterval(intervalo);
  }, [comanda]); 

    return (
        <>
            <div className={`${roboto.className} flex items-start justify-around flex-row w-full mt-6`}>
                <div>
                    <p className="text-xl" ><strong>Comanda:{comanda?.numerocomanda} </strong></p>
                    <p className="text-xl" ><strong>Mesa: {comanda?.mesa}</strong></p>
                    <p className="text-xl" ><strong>Tempo: {tempoAberto} </strong></p>
                </div>
                <div>
                    <p>Total</p>
                    <p className="text-2xl font-bold">R$ 10.00</p>
                </div>
            </div>
        </>
    )
}