"use client"
import Main from "./Telas/Main/page";
import Estoque from './Telas/Estoque/page'
import Login from './Telas/Login/page'
import CadastroProduto from './Telas/CadastroProduto/page'
import ArrayProdutos from '../app/componentes/ArrayProdutos/produtos'
import Pedidos from './Telas/Pedidos/page'
import Card from './componentes/Cards/card'
import ProdutosList from './Telas/ProdutosCategory/page'
export default function Home() {
  return (
    <div>
      <div>
       <ProdutosList/>
      </div>
    </div>
  );
}
