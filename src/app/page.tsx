"use client"
import Main from "./Telas/Main/page";
import Estoque from './Telas/(Estoque)/Estoque/page'
import Login from './Telas/Login/page'
import CadastroProduto from './Telas/(Estoque)/CadastroProduto/page'
import ArrayProdutos from './componentes/(ComponentesEstoque)/ArrayProdutos/produtos'
import Pedidos from './Telas/(Pedidos)/Pedidos/page'
import Card from './componentes/(ComponentesPedidos)/Card/card'
import ProdutosList from './Telas/(Pedidos)/ProdutosCategory/page'
import DataProduto from './Telas/(Estoque)/DadosProdutoTable/[produto_id]/page'
export default function Home() {
  return (
    <div>
      <div>
       <Main/>
      </div>
    </div>
  );
}
