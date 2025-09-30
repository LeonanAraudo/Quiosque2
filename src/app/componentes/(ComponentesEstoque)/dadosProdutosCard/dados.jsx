"use client"
import { robotoBold, roboto } from '../../../Fontes/fonts'
import style from '../../../Telas/(Estoque)/DadosProdutoTable/style.module.css'
import { Button } from "../../../../components/ui/button";
import { useEffect } from 'react';
import DialogDemo from '../EditProduto/patchProduto';
import destroyHook from '../../../../../hook/DeleteProdutoHook/hook'
import { useProdutoById } from '../../../../../hook/Produtos/useProdutoById'

export default function DadosProduto({produto_id}){
    const { produto, isLoading, fetchProduto } = useProdutoById(produto_id)
    const { onSubmit } = destroyHook(produto_id)

    // Função para formatar data
    const formatarData = (data) => {
        if (!data) return '';
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString('pt-BR');
    };

    if (isLoading) {
        return <p>Carregando produto...</p>
    }

    if (!produto) {
        return <p>Produto não encontrado</p>
    }

    return(
        <div>
            <div key={produto.produto_id} className={`${style.container} ${roboto.className}`}>
                <div className={style.boxImage}>
                    <img className={style.image} src={produto.foto} alt={produto.nome} />
                </div>
                <div className={style.dataBox}>
                    <div className={style.box1}>
                        <p className={`text-3xl ${robotoBold.className}`}>{produto.nome}</p>
                        <DialogDemo produto_id={produto_id} refreshProdutos={fetchProduto}/>
                    </div>
                    <div className={style.box2}>
                        <p className={style.amount}>Disponivel em estoque: {produto.quantidade_disponivel}</p>
                        <p className={`${robotoBold.className} text-[23px]`}>R${produto.preco_venda}</p>
                    </div> 
                    <div className={style.box3}>
                        <p className={`${robotoBold.className} text-lg`}>Informações do produto</p>
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
                                <p className={`${roboto.className} text-xs`}>{produto.fornecedor || 'N/A'}</p>
                            </div>                             
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between mt-4'>
                        <Button onClick={onSubmit} className='w-[130px] h-[25px]' type='button' variant="destructive">Apagar</Button>
                        <p className='text-xs'>Adicionado em: {formatarData(produto.data_cadastro)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}