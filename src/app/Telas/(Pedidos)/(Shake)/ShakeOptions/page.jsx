import Header from "@/app/componentes/Header/page";
import OptionsShake from '../../../../componentes/OptionsShake/optionsShake';

export default function ShakeOptions() {
    return (
        <>
            <div>
                <header>
                    <Header linkDestino={"/Telas/TelasButtons"} />
                </header>
                <OptionsShake/>
            </div>
        </>
    )
}