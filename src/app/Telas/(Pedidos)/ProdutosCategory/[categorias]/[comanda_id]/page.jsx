import Header from '../../../../../componentes/Header/header';
import Card from '../../../../../componentes/(ComponentesPedidos)/Card/card';

export default async function ProdutosCategoryPage({ params }) {
    const resolvedParams = await params;
    const { categorias, comanda_id } = resolvedParams;
  return (
    <div>
      <Header linkDestino={`/Telas/Comanda/${comanda_id}`} />
      <Card categorias={categorias} comanda_id={comanda_id} />
    </div>
  );
}
