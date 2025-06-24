import { roboto } from "@/app/Fontes/fonts"

export default function ButtonsComanda(){
    return(
        <div className={`${roboto.className}`}>
            <div className="w-full flex flex-row items-center justify-around">
                <button className="bg-[#E20A0A] w-24 h-8 text-white text-xl rounded-sm">Apagar</button>
                <button className="bg-[#1056B1] w-48 h-8 text-white text-xl rounded-sm">Enviar para cozinha</button>
                <button className="bg-[#2FD520] w-20 h-8 text-white text-xl rounded-sm">$</button>
            </div>
        </div>
    )
}