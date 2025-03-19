"use client"
import { useSearchParams } from "next/navigation";
import DadosProduto from '../../../componentes/dadosProdutosCard/dados'
import Header from '../../../componentes/Header/page'
export default function DataProduto(){
    const searchParams = useSearchParams();
    const produto_id = searchParams.get("produto_id");
return(
    <div>
        <header>
            <Header linkDestino={'/Telas/Estoque'}/>
        </header>
        <DadosProduto produto_id={produto_id}/>
    </div>
)
}