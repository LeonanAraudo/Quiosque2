"use client"
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import patchProdutos from "../../../../../hook/EditProdutosHook/hook";
import { useRef, useEffect, useState } from "react";

export default function DialogDemo({produto_id,refreshProdutos}) {
  const [open, setOpen] = useState(false);
  const { register, onSubmit, handleSubmit } = patchProdutos(produto_id, refreshProdutos);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 50); 
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <img width="25" height="25" src="https://img.icons8.com/windows/32/pencil.png" alt="pencil"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className=" flex flex-col gap-3">
              <div className="">
                  <Label htmlFor="name" className="text-right">Nome</Label>
                  <Input id="name" type="text" className="col-span-3" {...register('nome')}  />
              </div>
              <div className="flex items-center justify-center flex-row gap-10">
                  <div className=" w-[45%]">
                      <Label htmlFor="Quantidade_disponivel" className="text-right">
                      Quant.Disponivel
                      </Label>
                      <Input id="Quantidade_disponivel" type="number" className="col-span-3" {...register('quantidade_disponivel')} />
                  </div>
                  <div className=" w-[45%]">
                      <Label htmlFor="Quantidade_minima" className="text-right" >
                      Quant.Minima
                      </Label>
                      <Input id="Quantidade_minima" type="number" className="col-span-3" {...register('quantidade_minima')} />
                  </div>
              </div>
              <div className="flex items-center justify-center flex-row gap-10">
                  <div className="w-[45%]">
                      <Label htmlFor="date" className="text-right">Data Vencimento</Label>
                      <Input id="date" type="date" className="col-span-3" {...register('data_vencimento')} />
                  </div>
                  <Select {...register('categorias')}>
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
                      <Label htmlFor="preco_compra" className="text-right" >Preço Compra</Label>
                      <Input id="preco_compra" type="number" className="col-span-3" {...register('preco_compra')} />
                  </div>
                  <div className="w-[45%]">
                      <Label htmlFor="preco_venda" className="text-right" >Preço Venda</Label>
                      <Input id="preco_venda" type="number" className="col-span-3" {...register('preco_venda')} />
                  </div>
              </div>
              <div>
                  <Label htmlFor="descricao" className="text-right" >Descrição</Label>
                  <Textarea placeholder="Type your message here." {...register('descricao')}/>             
              </div>
              <div className="">
                  <Label htmlFor="marca" className="text-right" >Marca</Label>
                  <Input id="marca" type="text" className="col-span-3" {...register('marca')} />
              </div>
              <div className="">
                  <Label htmlFor="fornecedor" className="text-right">Fornecedor</Label>
                  <Input id="fornecedor" type="text" className="col-span-3" {...register('fornecedor')}/>
              </div>
              <div className="">
                  <Label htmlFor="modelo" className="text-right">Modelo</Label>
                  <Input id="modelo" type="text" className="col-span-3" {...register('modelo')} />
              </div>
          </div>
        <DialogFooter>
          <Button type="submit">Salvar mudanças</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
