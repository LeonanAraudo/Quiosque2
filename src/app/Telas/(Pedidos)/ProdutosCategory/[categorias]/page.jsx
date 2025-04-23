import Header from '../../../../componentes/Header/header';
import Card from '../../../../componentes/(ComponentesPedidos)/Card/card';

export default function ProdutosCategoryPage({ params }) {
  const { categorias } = params;

  return (
    <div>
      <Header linkDestino="/Telas/Pedidos" />
      <Card categorias={categorias} />
    </div>
  );
}
