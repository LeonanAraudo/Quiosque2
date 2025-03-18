import PatchComponent from "../../../componentes/EditProduto/patchProduto";
import Header from '../../../componentes/Header/page'
export default function PatchProdutos(){
    return(
        <>
        <header>
            <Header linkDestino={'/Telas/Estoque'}/>
        </header>
            <PatchComponent/>
        </>
    )
}