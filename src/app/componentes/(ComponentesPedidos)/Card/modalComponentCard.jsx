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
import { useAdicionarItemComanda } from "../../../../../hook/ItensComanda/useAdicionarItemComanda"
import { toast } from "react-toastify"

export default function DialogDemo({ produto_id, comanda_id, quantidade_disponivel }) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: { quantidade: 1 }
    })
    const { adicionarItem, isLoading } = useAdicionarItemComanda()

    const increment = () => {
        const atual = watch("quantidade")
        if (atual < quantidade_disponivel) {
            setValue("quantidade", atual + 1)
        } else {
            toast.info("Quantidade máxima em estoque atingida!")
        }
    }    
    const decrement = () => setValue("quantidade", Math.max(1, watch("quantidade") - 1))

    const onSubmit = async (formData) => {
        const dadosParaEnviar = {
            ...formData,
            produto_id: produto_id,
            comanda_id: comanda_id
        }

        const result = await adicionarItem(dadosParaEnviar)

        if (result.success) {
            console.log("Sucesso:", result.data)
            setOpen(false)
            reset()
        } else {
            toast.error(result.error)
            console.error("Erro:", result.error)
        }
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="personal" variant="black">+</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
                                    onChange={(e) => setValue("quantidade", Number(e.target.value))}
                                    {...register("quantidade")}
                                    disabled={isLoading}
                                />
                                <Button variant="black" onClick={increment} disabled={isLoading} type="button">+</Button>
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col gap-8">

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
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    fechar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}