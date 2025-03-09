"use client";
import { useSearchParams } from "next/navigation";
import Header from '../../componentes/Header/page';
import Card from '../../componentes/Cards/card';

export default function ProdutosList() {
    const searchParams = useSearchParams();
    const categorias = searchParams.get("categorias");

    return (
        <div>
            <Header linkDestino={'/Telas/Pedidos'} />
            <div>
                <h1>Produtos da categoria: {categorias}</h1>
                <Card categorias={categorias} />
            </div>
        </div>
    );
}
