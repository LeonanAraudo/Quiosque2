import Header from "@/app/componentes/Header/header";
import ItensComandaCozinha from "../../../../../componentes/(ComponentesPedidos)/(Cozinha)/ItensComandaCozinha/itensComandaCozinha";

export default function ItensComandaCozinhaPage({ params }) {
    const resolvedParams = params;
    const comanda_id = resolvedParams.comanda_id;

    return (
        <div className="h-[100vh] flex flex-col">
            <header>
                <Header linkDestino={"/Telas/ComandasCozinha"} />
            </header>
            <main className="flex-1">
                <ItensComandaCozinha comanda_id={comanda_id} />
            </main>
        </div>
    )
}
