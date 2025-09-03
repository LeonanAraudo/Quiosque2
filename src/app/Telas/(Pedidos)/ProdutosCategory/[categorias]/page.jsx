import Header from '../../../../componentes/Header/header';
import Card from '../../../../componentes/(ComponentesPedidos)/Card/card';

export default async function ProdutosCategoryPage({ params }) {
    const resolvedParams = await params;
    const { categorias } = resolvedParams;
  return (
    <div>
      <Header linkDestino="/Telas/Pedidos" />
      <Card categorias={categorias} />
    </div>
  );
}
