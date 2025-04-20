"use client"
import { roboto, robotoBold } from "@/app/Fontes/fonts"
import { useForm } from "react-hook-form"

export default function OptionsShake() {
    const { register, handleSubmit } = useForm()

    

    return (
        <form onSubmit={handleSubmit()}>
            <div>
                <p className={`text-[25px] text-center ${robotoBold.className}`}>Guaraná da Amazônia</p>
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
                            className="h-6 w-6 text-black accent-black"
                        />
                        <label htmlFor="tamanho-400" className={`text-sm text-center font-medium ${roboto.className}`}>
                            400ml<br />R$ 10,00
                        </label>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-1">
                        <input
                            type="radio"
                            id="tamanho-500"
                            value="500ml"
                            {...register("tamanho")}
                            className="h-6 w-6 text-black accent-black"
                        />
                        <label htmlFor="tamanho-500" className={`text-sm text-center font-medium ${roboto.className}`}>
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
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`sabor-${index}`} className={`text-sm font-medium ${roboto.className}`}>
                                    {sabor}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {["Leite Condensado", "Abacaxi", "Ovomaltine", "Maracujá", "Maçã Verde"].map((sabor, index) => (
                            <div key={index + 10} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={sabor}
                                    {...register("sabor")}
                                    id={`sabor-${index + 10}`}
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`sabor-${index + 10}`} className={`text-sm font-medium ${roboto.className}`}>
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
                        {["Menta", "Chocolate", "Morango", "Kiwi", "Leite Condensado"].map((cobertura, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={cobertura}
                                    {...register("cobertura")}
                                    id={`cobertura-${index}`}
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`cobertura-${index}`} className={`text-sm font-medium ${roboto.className}`}>
                                    {cobertura}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {["Chiclete", "Açai", "Doce de Leite", "Maracujá"].map((cobertura, index) => (
                            <div key={index + 10} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={cobertura}
                                    {...register("cobertura")}
                                    id={`cobertura-${index + 10}`}
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`cobertura-${index + 10}`} className={`text-sm font-medium ${roboto.className}`}>
                                    {cobertura}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <p className={`text-[22px] text-center ${robotoBold.className}`}>Adicionais</p>
                <div className="flex flex-row justify-between mx-9 mt-4">
                    <div className="flex flex-col gap-3">
                        {["Floco de Arroz", "Amendoim", "Granulado de Chocolate", "Castanha","Oreo"].map((adicionais, index) => (
                            <div key={index + 10} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={adicionais}
                                    {...register("adicionais")}
                                    id={`adicionais-${index + 10}`}
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`adicionais-${index + 10}`} className={`text-sm font-medium ${roboto.className}`}>
                                    {adicionais}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        {["Chocobal", "M&M", "Granulado Colorido", "Granola"].map((adicionais, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={adicionais}
                                    {...register("adicionais")}
                                    id={`adicionais-${index}`}
                                    className="h-6 w-6 text-black accent-black"
                                />
                                <label htmlFor={`adicionais-${index}`} className={`text-sm font-medium ${roboto.className}`}>
                                    {adicionais}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-9 flex justify-center">
                <button type="submit" className="bg-green-600 px-4 py-2 rounded-lg text-white">
                     Adicionar Pedido
                </button>
            </div>
        </form>
    )
}
