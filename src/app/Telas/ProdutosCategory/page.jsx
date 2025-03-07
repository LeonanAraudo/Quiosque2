import Header from '../../componentes/Header/page'
import Card from '../../componentes/Cards/card'
export default function ProdutosList(){
    return(
        <div>
            <Header linkDestino={'/Telas/Pedidos'} />
            <div>
                 <Card/>
            </div>
        </div>
    )
}