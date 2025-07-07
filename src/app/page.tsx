"use client"
import Main from "./Telas/Main/page";
import Estoque from './Telas/(Estoque)/Estoque/page'
import Login from './Telas/Login/page'
import CadastroProduto from './Telas/(Estoque)/CadastroProduto/page'
import ArrayProdutos from './componentes/(ComponentesEstoque)/ArrayProdutos/produtos'
import Card from './componentes/(ComponentesPedidos)/Card/card'
import ProdutosList from './Telas/(Pedidos)/ProdutosCategory/[categorias]/page'
import DataProduto from './Telas/(Estoque)/DadosProdutoTable/[produto_id]/page'
import Mesas from './Telas/(Pedidos)/Mesas/page'
import MesasFixas from '../app/componentes/(ComponentesPedidos)/(Mesas)/mesas'
import Comanda from '../app/Telas/(Pedidos)/Comanda/page'
export default function Home() {
  return (
    <div>
      <div>
        <Main />
      </div>
    </div>
  );
}
