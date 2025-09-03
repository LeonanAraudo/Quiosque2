"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function DialogDemo({ produto_id }) {
    const [value, setValue] = useState(1)
    const increment = () => setValue((prev) => prev + 1)
    const decrement = () => setValue((prev) => (prev > 1 ? prev - 1 : 1))
    const { register, handleSubmit } = useForm()

    const onSubmit = async (formData) => {
        const dadosParaEnviar = {
            ...formData,
            produto_id: produto_id,
        }

        try {
            const response = await fetch("/api/exemplo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosParaEnviar),
            })

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`)
            }

            const data = await response.json()
        } catch (err) {
            console.error("Erro:", err)
        }
    }
    return (
        <Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    <Button size="personal" variant="black">+</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Quantidade</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-center flex-row">
                            <Button variant="black" onClick={decrement}>-</Button>
                            <Input
                                id="username-1"
                                name="username"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                {...register("quantidade")}
                            />
                            <Button variant="black" onClick={increment}>+</Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">fechar</Button>
                        </DialogClose>
                        <Button variant="black" type="submit">Adicionar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
