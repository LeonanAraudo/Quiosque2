import DialogDemo from "../../../componentes/(ComponentesEstoque)/EditProduto/patchProduto";
import Header from '../../../componentes/Header/header'
export default function PatchProdutos(){
    return(
        <>
        <header>
            <Header linkDestino={'/Telas/Estoque'}/>
        </header>
            <DialogDemo/>
        </>
    )
}