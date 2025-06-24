import Header from "../../../componentes/Header/header";
import Pedidos from '../../../componentes/(ComponentesPedidos)/(Comanda)/CategoriaPedidos/item';
import ButtonsComanda from "../../../componentes/(ComponentesPedidos)/(Comanda)/Buttons/buttonsComanda";
import Infos from "../../../componentes/(ComponentesPedidos)/(Comanda)/Infos/infos"
export default function Comanda() {
    return (
        <>
            <Header linkDestino={"/"} />
            <Pedidos />
            <Infos/>
            <ButtonsComanda />
        </>
    )
}