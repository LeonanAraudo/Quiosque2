import Header from "@/app/componentes/Header/header";
import ComandaCozinha from "../../../../componentes/(ComponentesPedidos)/(Cozinha)/ComandasCozinha/comandaCozinha";

export default function ComandasCozinha(){
    return (
        <div className="h-[100vh] flex flex-col">
            <header>
                <Header linkDestino={"/Telas/Main"} />
            </header>
            <main className="flex-1">
                <ComandaCozinha/>
            </main>
        </div>
    )
}