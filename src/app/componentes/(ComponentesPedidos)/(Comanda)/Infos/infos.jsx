"use client"
import { useEffect, useState } from "react"
import { roboto } from "../../../../Fontes/fonts"
import dayjs from 'dayjs'
export default function Infos({ comanda_id }) {
    const [comanda, setComanda] = useState(null);
    const [tempoAberto, setTempoAberto] = useState("");
    useEffect(() => {
        async function fetchGet() {
            try {
                const response = await fetch(`/api/Gets/GetComandaById/${comanda_id}`)
                const data = await response.json()
                setComanda(data)
            } catch (error) {
                console.log('Error ao buscar comanda', error)
            }
        }
        fetchGet();
    }, [comanda_id]);

    useEffect(() => {
        if (!comanda) return;

        const intervalo = setInterval(() => {
            const agora = dayjs();
            const inicio = dayjs(new Date(comanda.tempo));
            const diffMinutos = agora.diff(inicio, "minute");
            const minutosPositivos = Math.max(0, diffMinutos);
            const horas = Math.floor(minutosPositivos / 60);
            const minutos = minutosPositivos % 60;

            setTempoAberto(`${horas}h:${minutos}m`);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [comanda]);
    return (
        <>
            <div className={`${roboto.className} flex items-start justify-around flex-row w-full my-6`}>
                <div className="flex w-full flex-col items-center gap-3">
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-xl" ><strong>Comanda: {comanda?.numerocomanda} </strong></p>
                        <p className="text-xl" ><strong>Mesa: {comanda?.mesa}</strong></p>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center">
                    <p className="text-xl" ><strong>Tempo: {tempoAberto} </strong></p>
                </div>
            </div>
        </>
    )
}