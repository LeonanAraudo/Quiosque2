"use client"
import Header from "../../../../componentes/Header/header";
import DadosProduto from "../../../../componentes/(ComponentesEstoque)/dadosProdutosCard/dados";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const params = useParams();
  const produto_id = params?.produto_id;

  if (!produto_id) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header linkDestino={'/Telas/Estoque'} />
      <Suspense fallback={<div>Carregando Produto...</div>}>
        <DadosProduto produto_id={produto_id} />
      </Suspense>
    </>
  );
}
