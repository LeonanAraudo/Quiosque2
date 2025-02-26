import Header from '../../componentes/Header/page'
import ArrayProdutos from '@/app/componentes/ArrayProdutos/produtos'
import style from './style.module.css'
export default function Estoque(){
    return(
        <div>
            <Header/>
            <div className='w-full flex items-center justify-center'>
                <input type='text' placeholder='pesquise um produto' className={style.input}/>

            </div>
        <div>
            <ArrayProdutos/>
        </div>
        </div>
    )
}