import Header from '../../../componentes/Header/page'
import { robotoBold, roboto } from '../../../Fontes/fonts'
import style from './style.module.css'
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';


export default function DataProduto(){
    const [produto, setProduto] = useState()
    const searchParams = useSearchParams();
    const produto_id = searchParams.get("produto_id");

    useEffect(() => {
        async function fetchProdutos(){
            const url = produto_id ? `/api/GetProdutoById/${produto_id}` : '/api/GetProdutoById'
            const response = await fetch(url)
            const data = await response.json()
            setProduto(data)
        }
        fetchProdutos()
    },[produto_id])
    return(
            <div className={`${style.container} ${roboto.className}`}>
                <header>
                    <Header linkDestino={""}/>
                </header>
                <div className={style.boxImage}>
                    <img className={style.image} src={produto.foto} alt="" />
                </div>
                <div className={style.dataBox}>
                        <div className={style.box1}>
                            <p className={`text-3xl ${robotoBold.className}`}>{produto.nome}</p>
                            <img width="25" height="25" src="https://img.icons8.com/windows/32/pencil.png" alt="pencil"/>
                        </div>
                        <div className={style.box2}>
                            <p className={style.amount}>Disponivel em estoque: {produto.quantidade_disponivel}</p>
                            <p className={`${robotoBold.className} text-[23px]`}>R${produto.preco_venda}</p>
                        </div> 
                        <div className={style.box3}>
                            <p className={`${robotoBold.className} text-lg`}>Informações do Produto</p>
                            <div className='flex flex-col gap-2 mt-2 ml-2'>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Preço de Compra</p>
                                    <p className={`${roboto.className} text-xs`}>R${produto.preco_compra}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Descrição</p>
                                    <p className={`${roboto.className} text-xs`}>{produto.descricao}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Marca</p>
                                    <p className={`${roboto.className} text-xs`}>{produto.marca}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Modelo</p>
                                    <p className={`${roboto.className} text-xs`}>{produto.modelo}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Fornecedor</p>
                                    <p className={`${roboto.className} text-xs`}>{produto.modelo}</p>
                                </div>                             
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between mt-4'>
                            <Button className='w-[130px] h-[25px]' variant="destructive">Apagar</Button>
                            <p className='text-xs'>Adicionado em: {produto.data_cadastro}</p>
                        </div>
                    </div>
                </div>
    )
}