import Header from '../../../../componentes/Header/header'
import PagamentoComponent from '../../../../componentes/(ComponentesPedidos)/(Comanda)/Pagamento/pagamento'
export default async function Pagamento({params}) {
    const resolvedParams = await params;
    const comanda_id = resolvedParams.comanda_id
    return (
        <div className='h-[100vh] w-full'>
        <header>
            <Header linkDestino={`/Telas/Comanda/${comanda_id}`}/>
        </header>
        <PagamentoComponent comanda_id={comanda_id}/>
        </div>
    )
}