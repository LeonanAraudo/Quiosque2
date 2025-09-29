"use client"
import { useEffect, useState } from "react"
import { roboto } from "../../../../Fontes/fonts"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');

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
            }
        }
        fetchGet();
    }, [comanda_id]);

   useEffect(() => {
    if (!comanda) return;

    const interval = setInterval(() => {
        // Converter para o fuso horário do Brasil
        const criadoEm = dayjs(comanda.tempo).tz('America/Sao_Paulo'); 
        const agora = dayjs().tz('America/Sao_Paulo'); 
        const diff = agora.diff(criadoEm, "second");

        const horas = Math.floor(diff / 3600);
        const minutos = Math.floor((diff % 3600) / 60);
        const segundos = diff % 60;

        const formatado =
            (horas > 0 ? `${horas}h ` : "") +
            `${minutos}m ${segundos}s`;

        setTempoAberto(formatado);
    }, 1000);

    return () => clearInterval(interval);
}, [comanda]);

    return (
        <div className={`${roboto.className} flex items-start justify-around flex-row w-full my-6`}>
            <div className="flex w-full flex-col items-center gap-3">
                <div className="flex flex-col items-start gap-4">
                    <p className="text-xl"><strong>Comanda: {comanda?.numerocomanda} </strong></p>
                    <p className="text-xl"><strong>Mesa: {comanda?.mesa}</strong></p>
                </div>
            </div>
            <div className="flex w-full flex-row items-center">
                <p className="text-xl"><strong>Tempo: {tempoAberto}</strong></p>
            </div>
        </div>
    )
}
