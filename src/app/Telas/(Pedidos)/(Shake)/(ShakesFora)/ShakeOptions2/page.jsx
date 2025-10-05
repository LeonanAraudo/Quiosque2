import Header from "../../../../../componentes/Header/header";
import OptionsShake2 from '../../../../../componentes/(ComponentesPedidos)/OptionsShake2/optionsShake2';

export default async function ShakeOptions() {
    
    return (
        <>
            <div>
                <header>
                    <Header linkDestino={`/Telas/Mesas`} />
                </header>
                    <OptionsShake2/>
            </div>
        </>
    )
}