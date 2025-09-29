import Comanda from '../../../../../componentes/(ComponentesPedidos)/(Cozinha)/ComandaShakesCozinha/comanda'
import Header from '../../../../../componentes/Header/header'
export default async function ShakeComanda({params}){
    const resolvedParams = await params;
    const shake_id = resolvedParams.shake_id;
    return(
        <>
        <header>
            <Header linkDestino={"/Telas/ComandasCozinha"}/>
        </header>
        <div>
            <Comanda shake_id={shake_id}/>
        </div>
        </>
    )
}