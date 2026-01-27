"use client"
import { useRouter } from "next/navigation"
import { roboto } from "../../../../Fontes/fonts"
export default function OptionsPedidos() {
    const router = useRouter()
    const handleGuaranaSolo = () => {
        router.push("/Telas/ShakeOptions2")
    }
     const handleMesas = () => {
        router.push("/Telas/Mesas")
    }
     const handleListaGuarana = () => {
        router.push("/Telas/ShakeComanda2")
    }
    return (
        <div className="w-full h-auto mt-16 flex items-center justify-center flex-col gap-7">
           <button onClick={handleGuaranaSolo} className={`flex justify-center items-center flex-row bg-black gap-3 text-white text-center text-[20px] w-[95%] h-[60px] rounded-[10px] ${roboto.className}`}>
             Montar Guaraná da Amazônia
            <span>
                <img width="30" height="30" src="https://img.icons8.com/comic/100/FFFFFF/milkshake.png" alt="milkshake" />
                </span>
           </button>

           <button onClick={handleListaGuarana} className={`flex justify-center items-center flex-row bg-blue-900 gap-3 text-white text-center text-[20px] w-[95%] h-[60px] rounded-[10px] ${roboto.className}`}>
             Lista Guaraná da Amazônia
            <span>
                <img width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/checklist--v1.png" alt="ListaShakes" />
                </span>
           </button>
        </div>
    )
}