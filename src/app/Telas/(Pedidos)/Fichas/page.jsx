import Header from "../../../componentes/Header/header"
import FichasComponent from "../../../componentes/(ComponentesPedidos)/Fichas/componentFichas"

export default function ViewFichas() {
    return( 
        <div>
            <Header linkDestino={"/Telas/Main"} />
            <FichasComponent />
        </div>
    )
}