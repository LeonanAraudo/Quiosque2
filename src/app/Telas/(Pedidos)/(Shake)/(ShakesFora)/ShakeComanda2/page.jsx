import Comanda from '../../../../../componentes/(ComponentesPedidos)/ComandaShakes2/comanda'
import Header from '../../../../../componentes/Header/header'
export default async function ShakeComanda(){
    
    return(
        <>
        <header>
            <Header linkDestino={"/Telas/ComandasCozinha"}/>
        </header>
        <div>
            <Comanda />
        </div>
        </>
    )
}