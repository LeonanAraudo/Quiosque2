"use client"
import { robotoBold, roboto } from '../../Fontes/fonts'
import style from '../../Telas/(Estoque)/DadosProduto/style.module.css'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';


export default function DadosProduto({produto_id}){
    const [ produto, setProduto] = useState([])
    console.log("a produto id" + produto_id)
    useEffect(() => {
        async function fetchProdutos(){
            const url = `/api/GetProdutoById/${produto_id}`
            const response = await fetch(url)
            const data = await response.json();
            console.log("a data e esse" + data)
            setProduto(data)
        }
        fetchProdutos();
    },[produto_id])

    console.log("o produto e esse" + produto)
    return(
            <div className={`${style.container} ${roboto.className}`}>
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