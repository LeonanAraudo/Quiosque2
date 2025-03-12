import Header from '../../../componentes/Header/page'
import style from './style.module.css'
import { inter } from '../../../Fontes/fonts'
import Link from 'next/link'

export default function Pedidos() {
    const categorias = [
        { nome: "Bebidas", icone: "https://img.icons8.com/ios/50/FFFFFF/wine-bottle.png", destino: "/Telas/ProdutosCategory?categorias=Bebidas" },
        { nome: "Lanches", icone: "https://img.icons8.com/ios/50/FFFFFF/hamburger.png", destino: "/Telas/ProdutosCategory?categoria=lanches" },
        { nome: "Shakes", icone: "https://img.icons8.com/ios/50/FFFFFF/milkshake.png", destino: "/Telas/ProdutosCategory?categoria=shakes" },
        { nome: "Porções", icone: "https://img.icons8.com/ios/50/FFFFFF/porridge--v1.png", destino: "/Telas/ProdutosCategory?categoria=porcoes" },
    ];

    return (
        <div>
            <Header linkDestino={"/Telas/Main"} />
            <div className='mt-12'>
                <div className='w-full flex items-center justify-evenly'>
                    {categorias.slice(0, 2).map((categoria, index) => (
                        <Link key={index} href={categoria.destino} className={style.produto}>
                            <img width="55" height="55" src={categoria.icone} alt={categoria.nome} />
                            <p className={`${style.unline} ${inter.className}`}>{categoria.nome}</p>
                        </Link>
                    ))}
                </div>
                <div className='w-full flex items-center justify-evenly mt-10'>
                    {categorias.slice(2).map((categoria, index) => (
                        <Link key={index} href={categoria.destino} className={style.produto}>
                            <img width="50" height="50" src={categoria.icone} alt={categoria.nome} />
                            <p className={`${style.unline} ${inter.className}`}>{categoria.nome}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <p className={`text-[20px] mt-10 ml-10 ${inter.className}`}>Recentes</p>
                </div>
            </div>
        </div>
    );
}
