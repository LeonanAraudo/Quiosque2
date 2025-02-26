"use client"
import Main from "./Telas/Main/page";
import Estoque from './Telas/Estoque/page'
import Login from './Telas/Login/page'
import CadastroProduto from './Telas/CadastroProduto/page'
import ArrayProdutos from '../app/componentes/ArrayProdutos/produtos'
export default function Home() {
  return (
    <div>
      <div>
       <Estoque/>
      </div>
    </div>
  );
}
