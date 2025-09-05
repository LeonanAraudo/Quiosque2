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
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function DialogDemo({ produto_id, comanda_id }) {
    const [value, setValue] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false) // Controla o estado do Dialog

    const increment = () => setValue((prev) => prev + 1)
    const decrement = () => setValue((prev) => (prev > 1 ? prev - 1 : 1))
    const { register, handleSubmit, reset } = useForm()
    
    const onSubmit = async (formData) => {
        const dadosParaEnviar = {
            ...formData,
            produto_id: produto_id,
            comanda_id: comanda_id
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/Posts/CadItemComanda/itemComanda", {
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
            console.log("Sucesso:", data)
            
            // Fecha o modal e reseta o formulário
            setOpen(false)
            reset()
            setValue(1)

        } catch (err) {
            console.error("Erro:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="personal" variant="black">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Quantidade</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-center flex-row">
                            <Button variant="black" onClick={decrement} disabled={isLoading} type="button">-</Button>
                            <Input
                                id="username-1"
                                name="username"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                {...register("quantidade")}
                                disabled={isLoading}
                            />
                            <Button variant="black" onClick={increment} disabled={isLoading} type="button">+</Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                disabled={isLoading}
                            >
                                fechar
                            </Button>
                        </DialogClose>
                        <Button variant="black" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                                    Adicionando...
                                </>
                            ) : (
                                "Adicionar"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}