import Link from 'next/link'
import Header from '../../../../componentes/Header/header'
import { roboto, robotoBold } from '@/app/Fontes/fonts'
export default function ShakeOption() {
    return (
        <div>
            <header>
                <Header linkDestino={"/Telas/Pedidos"} />
            </header>
            <div className='flex w-full items-center justify-center mt-16'>
                <div className='w-[100%] flex items-center justify-center flex-col gap-8'>
                    <Link href={"/Telas/ShakeOptions"} className={`bg-black text-white w-[90%] h-[50px] flex items-center justify-between p-2 flex-row rounded-full ${roboto.className}`}>
                        Montar Guaraná da Amazônia
                        <span className="bg-white/30 rounded-full ">
                            <img width="40" height="40" src="https://img.icons8.com/comic/100/FFFFFF/milkshake.png" alt="milkshake" />
                        </span>
                    </Link>

                    <Link className={`bg-black text-white w-[90%] h-[50px] flex items-center justify-between p-2 flex-row rounded-full ${roboto.className}`} href={"/Telas/ShakeComanda"}>
                        Lista de Pedidos
                        <span className="bg-white/30 rounded-full ">
                            <img width="40" height="40" src="https://img.icons8.com/dotty/80/FFFFFF/todo-list.png" alt="todo-list" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}