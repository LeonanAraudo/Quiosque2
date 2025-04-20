import Link from 'next/link'
import Header from '../../../../componentes/Header/page'
import { roboto, robotoBold } from '@/app/Fontes/fonts'
export default function ShakeOption() {
    return (
        <div>
            <header>
                <Header linkDestino={"/Telas/Pedidos"} />
            </header>
            <div className='flex w-full items-center justify-center mt-16'>
                <div className='w-[100%] flex items-center justify-center flex-col gap-8'>
                    <Link className={`bg-black text-white w-[66%] h-[40px] flex items-center justify-between p-2 flex-row rounded-full ${roboto.className}`} href={"/"}>
                        Montar Guaraná da Amazônia
                        <span className="bg-white/30 rounded-full ">
                            <img width="30" height="30" src="https://img.icons8.com/comic/100/FFFFFF/milkshake.png" alt="milkshake" />
                        </span>
                    </Link>

                    <Link className={`bg-black text-white w-[66%] h-[40px] flex items-center justify-between p-2 flex-row rounded-full ${roboto.className}`} href={"/"}>
                        Lista de Pedidos
                        <span className="bg-white/30 rounded-full ">
                            <img width="27" height="27" src="https://img.icons8.com/dotty/80/FFFFFF/todo-list.png" alt="todo-list" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}