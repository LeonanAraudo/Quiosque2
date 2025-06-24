import { roboto } from "../../../../Fontes/fonts"
export default function Infos() {
    return (
        <>
            <div className={`${roboto.className} flex items-start justify-around flex-row w-full mt-6`}>
                <div>
                    <p className="text-xl" ><strong>Comanda: </strong></p>
                    <p className="text-xl" ><strong>Mesa: </strong></p>
                    <p className="text-xl" ><strong>Tempo: : </strong></p>
                </div>
                <div>
                    <p>Total</p>
                    <p className="text-2xl font-bold">R$ 10.00</p>
                </div>
            </div>
        </>
    )
}