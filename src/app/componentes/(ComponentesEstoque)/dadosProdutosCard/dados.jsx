"use client"
import { robotoBold, roboto } from '../../../Fontes/fonts'
import style from '../../../Telas/(Estoque)/DadosProdutoTable/style.module.css'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import DialogDemo from '../EditProduto/patchProduto';
import destroyHook from '../../../../../hook/DeleteProdutoHook/hook'

export default function DadosProduto({produto_id}){
    const [ produto, setProduto] = useState([])
    const { onSubmit} = destroyHook(produto_id)
    const fetchProdutos = async () => {
        try{
            const url = `/api/GetProdutoById/${produto_id}`
            const response = await fetch(url)
            const data = await response.json();
            setProduto(data.map((item) => { return item }))
        }catch(error){
            console.error("Erro ao buscar dados do produto:", error);
        }
    }

    useEffect(() => {
        fetchProdutos();
      }, [produto_id]);
        
    return(
        <div>
        {produto.map((row) => (
            <div key={row.produto_id} className={`${style.container} ${roboto.className}`}>
                {console.log(produto)}
                <div className={style.boxImage}>
                    <img className={style.image} src={row.foto} alt="" />
                </div>
                <div className={style.dataBox}>
                        <div className={style.box1}>
                            <p className={`text-3xl ${robotoBold.className}`}>{row.nome}</p>
                            <DialogDemo produto_id={produto_id} refreshProdutos={fetchProdutos}/>
                        </div>
                        <div className={style.box2}>
                            <p className={style.amount}>Disponivel em estoque: {row.quantidade_disponivel}</p>
                            <p className={`${robotoBold.className} text-[23px]`}>R${row.preco_venda}</p>
                        </div> 
                        <div className={style.box3}>
                            <p className={`${robotoBold.className} text-lg`}>Informações do row</p>
                            <div className='flex flex-col gap-2 mt-2 ml-2'>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Preço de Compra</p>
                                    <p className={`${roboto.className} text-xs`}>R${row.preco_compra}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Descrição</p>
                                    <p className={`${roboto.className} text-xs`}>{row.descricao}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Marca</p>
                                    <p className={`${roboto.className} text-xs`}>{row.marca}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Modelo</p>
                                    <p className={`${roboto.className} text-xs`}>{row.modelo}</p>
                                </div>
                                <div>
                                    <p className={`${robotoBold.className} text-sm`}>Fornecedor</p>
                                    <p className={`${roboto.className} text-xs`}>{row.modelo}</p>
                                </div>                             
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between mt-4'>
                            <Button onClick={onSubmit} className='w-[130px] h-[25px]' type='button' variant="destructive">Apagar</Button>
                            <p className='text-xs'>Adicionado em: {row.data_cadastro}</p>
                        </div>
                    </div>
                </div>
          ) )
        }
        </div>
    )
}