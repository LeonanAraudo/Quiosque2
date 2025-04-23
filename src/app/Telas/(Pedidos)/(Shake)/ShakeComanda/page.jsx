import Comanda from '../../../../componentes/(ComponentesPedidos)/ComandaShakes/comanda'
import Header from '../../../../componentes/Header/page'
export default function ShakeComanda(){
    return(
        <>
        <header>
            <Header linkDestino={"/Telas/ShakeButtons"}/>
        </header>
        <div>
            <Comanda/>
        </div>
        </>
    )
}