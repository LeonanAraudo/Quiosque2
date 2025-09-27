"use client"
import { roboto, robotoBold } from "@/app/Fontes/fonts"
import createShake from "../../../../../hook/CreateShake/hook"
import { ToastContainer, Zoom } from 'react-toastify';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export default function OptionsShake({comanda_id}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    console.log("comanda id recebido no options shake: " + comanda_id)
    const { register, onSubmit, handleSubmit } = createShake({comanda_id})
     
    const handleFormSubmit = async (data) => {
        setIsButtonDisabled(true)
        try {
            await onSubmit(data) // espera o cadastro finalizar
        } finally {
            setIsButtonDisabled(false) // ativa o botão de novo (mesmo se der erro)
        }
    }
    
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
            />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    <p className={`text-[25px] text-center ${robotoBold.className}`}>Guaraná da Amazônia</p>
                </div>
                <div className="w-full flex items-center justify-center flex-col my-5">
                    <div className="w-[80%] flex items-start justify-start flex-col">
                        <Label className={`text-[17px] mb-1 ${robotoBold.className}`} htmlFor="picture">Nome ou Mesa</Label>
                        <Input {...register("nome")} className={`${roboto.className}`} type="text" placeholder="Digite o nome ou mesa" />
                    </div>
                </div>

                <div className="mt-3">
                    <p className={`text-[22px] text-center ${robotoBold.className}`}>Tamanho</p>
                    <div className="w-full flex flex-row items-center justify-around mt-4">
                        <div className="flex items-center justify-center flex-col gap-1">
                            <input
                                type="radio"
                                id="tamanho-400"
                                value="400ml"
                                {...register("tamanho")}
                                className="h-7 w-7 text-black accent-black"
                            />
                            <label htmlFor="tamanho-400" className={`text-[18px] text-center  ${roboto.className}`}>
                                400ml<br />R$ 10,00
                            </label>
                        </div>
                        <div className="flex items-center justify-center flex-col gap-1">
                            <input
                                type="radio"
                                id="tamanho-500"
                                value="500ml"
                                {...register("tamanho")}
                                className="h-7 w-7 text-black accent-black"
                            />
                            <label htmlFor="tamanho-500" className={`text-[18px] text-center  ${roboto.className}`}>
                                500ml<br />R$ 12,00
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className={`text-[22px] text-center ${robotoBold.className}`}>Sabor</p>
                    <div className="flex flex-row justify-between mx-10  mt-4">
                        <div className="flex flex-col gap-3">
                            {["Tradicional", "Chocolate", "Morango", "Açai", "Oreo", "Chocolate Branco"].map((sabor, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={sabor}
                                        {...register("sabor")}
                                        id={`sabor-${index}`}
                                        className="h-7 w-7 text-black accent-black"
                                    />
                                    <label htmlFor={`sabor-${index}`} className={`text-[18px]  ${roboto.className}`}>
                                        {sabor}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            {["Abacaxi", "Ovomaltine", "Maracujá", "Maçã Verde", "Leite Condensado"].map((sabor, index) => (
                                <div key={index + 10} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={sabor}
                                        {...register("sabor")}
                                        id={`sabor-${index + 10}`}
                                        className="h-7 w-7 text-black accent-black"
                                    />
                                    <label htmlFor={`sabor-${index + 10}`} className={`text-[18px]  ${roboto.className}`}>
                                        {sabor}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className={`text-[22px] text-center ${robotoBold.className}`}>Cobertura</p>
                    <div className="flex flex-row justify-between mx-10 mt-4">
                        <div className="flex flex-col gap-3">
                            {["Menta", "Chocolate", "Morango", "Kiwi", "Leite Condensado","Fini Beijos"].map((cobertura, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={cobertura}
                                        {...register("cobertura")}
                                        id={`cobertura-${index}`}
                                        className="h-7 w-7 text-black accent-black"
                                    />
                                    <label htmlFor={`cobertura-${index}`} className={`text-[18px]  ${roboto.className}`}>
                                        {cobertura}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            {["Chiclete", "Açai", "Doce de Leite", "Maracujá","Fini Banana"].map((cobertura, index) => (
                                <div key={index + 10} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={cobertura}
                                        {...register("cobertura")}
                                        id={`cobertura-${index + 10}`}
                                        className="h-7 w-7 text-black accent-black"
                                    />
                                    <label htmlFor={`cobertura-${index + 10}`} className={`text-[18px]  ${roboto.className}`}>
                                        {cobertura}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className={`text-[22px] text-center ${robotoBold.className}`}>Adicionais</p>
                    <div className="flex flex-row justify-between mx-6 mt-4">
                        <div className="flex flex-col gap-3">
                            {["Floco de Arroz", "Amendoim", "Castanha", "Oreo", "Granulado de Chocolate"].map((adicionais, index) => (
                                <div key={index + 10} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={adicionais}
                                        {...register("adicionais")}
                                        id={`adicionais-${index + 10}`}
                                        className="appearance-none h-7 w-7 rounded-full border border-black flex items-center justify-center relative
                                            checked:bg-white checked:before:content-[''] checked:before:absolute
                                            checked:before:h-[15px] checked:before:w-[15px] checked:before:rounded-full
                                            checked:before:bg-black checked:before:top-1/2 checked:before:left-1/2
                                            checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                                    />
                                    <label htmlFor={`adicionais-${index + 10}`} className={`text-[18px]  ${roboto.className}`}>
                                        {adicionais}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            {["Chocobal", "M&M", "Granola", "Granulado Colorido"].map((adicionais, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={adicionais}
                                        {...register("adicionais")}
                                        id={`adicionais-${index}`}
                                        className="appearance-none h-7 w-7 rounded-full border border-black flex items-center justify-center relative
                                            checked:bg-white checked:before:content-[''] checked:before:absolute
                                            checked:before:h-[15px] checked:before:w-[15px] checked:before:rounded-full
                                            checked:before:bg-black checked:before:top-1/2 checked:before:left-1/2
                                            checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                                    />
                                    <label htmlFor={`adicionais-${index}`} className={`text-[18px]  ${roboto.className}`}>
                                        {adicionais}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="my-9 flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-600 px-4 py-2 rounded-lg text-white disabled:opacity-50"
                        disabled={isButtonDisabled}
                    >
                        {isButtonDisabled ? "Adicionando..." : "Adicionar Pedido"}
                    </button>
                </div>
            </form>
        </>
    )
}
