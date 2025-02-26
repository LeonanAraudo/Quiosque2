import Header from '../../componentes/Header/page'
import style from './style.module.css'
import {inter} from '../../Fontes/fonts'
export default function Pedidos(){
    return(
        <div>
            <Header linkDestino={"/Telas/Main"} />
            <div className='mt-12'>
                <div className='w-full flex items-center justify-evenly'>
                    <div className={style.produto}>
                        <img width="55" height="55" src="https://img.icons8.com/ios/50/FFFFFF/wine-bottle.png" alt="wine-bottle"/>
                        <p className={inter.className}>Bebidas</p>
                    </div>
                    <div className={style.produto}>
                        <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/hamburger.png" alt="hamburger"/>
                        <p className={inter.className}>Lanches</p>
                    </div>
                </div>
                <div  className='w-full flex items-center justify-evenly mt-10'>
                    <div className={style.produto}>
                        <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/milkshake.png" alt="milkshake"/>
                        <p className={inter.className}>Shakes</p>
                    </div>
                    <div className={style.produto}>
                        <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/porridge--v1.png" alt="porridge--v1"/>
                        <p className={inter.className}>Porções</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p className={`text-[20px] mt-10 ml-10 ${inter.className}`}>Recentes</p>
                </div>
            </div>
        </div>
    )
}