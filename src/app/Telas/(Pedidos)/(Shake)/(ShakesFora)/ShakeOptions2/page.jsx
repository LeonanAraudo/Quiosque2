import Header from "../../../../../componentes/Header/header";
import OptionsShake from '../../../../../componentes/(ComponentesPedidos)/OptionsShake/optionsShake';

export default async function ShakeOptions() {
    return (
        <>
            <div>
                <header>
                    <Header linkDestino={`/Telas/Options`} />
                </header>
                <OptionsShake />
            </div>
        </>
    )
}