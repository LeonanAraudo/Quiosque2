import Header from "@/app/componentes/Header/page";
import OptionsShake from '../../../../componentes/(ComponentesPedidos)/OptionsShake/optionsShake';

export default function ShakeOptions() {
    return (
        <>
            <div>
                <header>
                    <Header linkDestino={"/Telas/ShakeButtons"} />
                </header>
                    <OptionsShake/>
            </div>
        </>
    )
}