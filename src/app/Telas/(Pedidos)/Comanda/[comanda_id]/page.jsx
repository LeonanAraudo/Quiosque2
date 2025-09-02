import Header from "../../../../componentes/Header/header";
import Pedidos from '../../../../componentes/(ComponentesPedidos)/(Comanda)/CategoriaPedidos/item';
import ButtonsComanda from "../../../../componentes/(ComponentesPedidos)/(Comanda)/Buttons/buttonsComanda";
import Infos from "../../../../componentes/(ComponentesPedidos)/(Comanda)/Infos/infos"
import ProdutosComanda from '../../../../componentes/(ComponentesPedidos)/(Comanda)/ProdutosComanda/produtoscomanda'
export default async function Comanda({params}) {
        const resolvedParams = await params;
        const comanda_id = resolvedParams.comanda_id
    return (
        <>
            <Header linkDestino={"/"} />
            <Pedidos />
            <Infos comanda_id={comanda_id}/>
            <ProdutosComanda comanda_id={comanda_id} />
            <ButtonsComanda />
        </>
    )
}