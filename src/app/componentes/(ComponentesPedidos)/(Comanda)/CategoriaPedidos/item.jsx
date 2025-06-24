import style from './style.module.css'
import { inter } from '../../../../Fontes/fonts'
import Link from 'next/link'

export default function Pedidos() {
    const categorias = [
        { nome: "Bebidas", icone: "https://img.icons8.com/ios/50/FFFFFF/wine-bottle.png", destino: "/Telas/ProdutosCategory/Bebidas" },
        { nome: "Lanches", icone: "https://img.icons8.com/ios/50/FFFFFF/hamburger.png", destino: "/Telas/ProdutosCategory/Lanches" },
        { nome: "Shakes", icone: "https://img.icons8.com/ios/50/FFFFFF/milkshake.png", destino: "/Telas/ShakeButtons" },
        { nome: "Porções", icone: "https://img.icons8.com/ios/50/FFFFFF/porridge--v1.png", destino: "/Telas/ProdutosCategory/Porcoes" },
    ];

    return (
        <div>
            <div className='mt-12 flex items-center justify-center flex-col'>
                <div className='w-full flex items-center justify-around'>
                    {categorias.slice(0, 2).map((categoria, index) => (
                        <Link key={index} href={categoria.destino} className={style.produto}>
                            <img width="55" height="55" src={categoria.icone} alt={categoria.nome} />
                            <p className={`${style.unline} ${inter.className}`}>{categoria.nome}</p>
                        </Link>
                    ))}
                </div>
                <div className='w-full flex items-center justify-around mt-10'>
                    {categorias.slice(2).map((categoria, index) => (
                        <Link key={index} href={categoria.destino} className={style.produto}>
                            <img width="50" height="50" src={categoria.icone} alt={categoria.nome} />
                            <p className={`${style.unline} ${inter.className}`}>{categoria.nome}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
