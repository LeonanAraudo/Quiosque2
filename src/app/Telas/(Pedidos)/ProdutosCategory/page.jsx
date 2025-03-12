"use client";
import { useSearchParams } from "next/navigation";
import Header from '../../../componentes/Header/page';
import Card from '../../../componentes/Cards/card';

export default function ProdutosList() {
    const searchParams = useSearchParams();
    const categorias = searchParams.get("categorias");

    return (
        <div>
            <Header linkDestino={'/Telas/Pedidos'} />
            <div>
                <Card categorias={categorias} />
            </div>
        </div>
    );
}
