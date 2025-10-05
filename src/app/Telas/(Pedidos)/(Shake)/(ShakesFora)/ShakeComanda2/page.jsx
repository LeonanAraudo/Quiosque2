import Comanda from '../../../../../componentes/(ComponentesPedidos)/ComandaShakes2/comanda'
import Header from '../../../../../componentes/Header/header'
export default async function ShakeComanda(){
    
    return(
        <>
        <header>
            <Header linkDestino={"/Telas/Options"}/>
        </header>
        <div>
            <Comanda />
        </div>
        </>
    )
}