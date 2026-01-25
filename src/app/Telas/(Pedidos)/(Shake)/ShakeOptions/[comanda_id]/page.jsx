import Header from "../../../../../componentes/Header/header";
import OptionsShake from '../../../../../componentes/(ComponentesPedidos)/OptionsShake/optionsShake';

export default async function ShakeOptions({params}) {
    const resolvedParams = await params;
    const comanda_id = parseInt(resolvedParams.comanda_id, 10);
    return (
        <>
            <div>
                <header>
                    <Header linkDestino={`/Telas/Comanda/${comanda_id}`} />
                </header>
                    <OptionsShake comanda_id={comanda_id}/>
            </div>
        </>
    )
}