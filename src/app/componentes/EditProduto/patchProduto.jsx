import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-3">
            <div className="">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input id="name" type="text" className="col-span-3" />
            </div>
            <div className="flex items-center justify-center flex-row gap-10">
                <div className=" w-[45%]">
                    <Label htmlFor="Quantidade_disponivel" className="text-right">
                    Quant.Disponivel
                    </Label>
                    <Input id="Quantidade_disponivel" type="number" className="col-span-3" />
                </div>
                <div className=" w-[45%]">
                    <Label htmlFor="Quantidade_minima" className="text-right">
                    Quant.Minima
                    </Label>
                    <Input id="Quantidade_minima" type="number" className="col-span-3" />
                </div>
            </div>
            <div className="flex items-center justify-center flex-row gap-10">
                <div className="w-[45%]">
                    <Label htmlFor="date" className="text-right">Data Vencimento</Label>
                    <Input id="date" type="date" className="col-span-3" />
                </div>
                <Select>
                    <SelectTrigger className="w-[45%] mt-5">
                        <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div> 
            <div className="flex items-center justify-center flex-row gap-10">
                <div className="w-[45%]">
                    <Label htmlFor="preco_compra" className="text-right">Preço Compra</Label>
                    <Input id="preco_compra" type="number" className="col-span-3" />
                </div>
                <div className="w-[45%]">
                    <Label htmlFor="preco_venda" className="text-right">Preço Venda</Label>
                    <Input id="preco_venda" type="number" className="col-span-3" />
                </div>
            </div>
            <div>
                <Label htmlFor="descricao" className="text-right">Descrição</Label>
                <Textarea placeholder="Type your message here." />             
            </div>
            <div className="">
                <Label htmlFor="marca" className="text-right">Marca</Label>
                <Input id="marca" type="text" className="col-span-3" />
            </div>
            <div className="">
                <Label htmlFor="fornecedor" className="text-right">Fornecedor</Label>
                <Input id="fornecedor" type="text" className="col-span-3" />
            </div>
            <div className="">
                <Label htmlFor="modelo" className="text-right">Modelo</Label>
                <Input id="modelo" type="text" className="col-span-3" />
            </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar mudanças</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
