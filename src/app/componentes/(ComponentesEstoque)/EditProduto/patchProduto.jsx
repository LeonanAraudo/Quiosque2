"use client";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import patchProdutos from "../../../../../hook/EditProdutosHook/hook";

export default function DialogDemo({ produto_id, refreshProdutos }) {
  const [open, setOpen] = useState(false);
  const { register, onSubmit, handleSubmit, setValue } = patchProdutos(
    produto_id,
    refreshProdutos,
    () => setOpen(false)
  );

  const [imageSrc, setImageSrc] = useState(null);

  const localHandleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setValue("foto", [file]); // importante para react-hook-form
    }
  };

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
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/windows/32/pencil.png"
          alt="pencil"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            {/* Imagem */}
            <div>
              <label htmlFor="image" className="flex justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    className="bg-cover w-[85%] h-56 object-cover rounded"
                    alt="Prévia"
                  />
                ) : (
                  <p className="bg-gray-300 w-full h-56 rounded cursor-pointer flex items-center justify-center">
                    Clique para enviar uma imagem
                  </p>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="hidden"
                {...register("foto", {
                  onChange: (e) => localHandleFileChange(e),
                })}
              />
            </div>

            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register("nome")} />
            </div>

            {/* Quantidades */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="quantidade_disponivel">Quant. Disponível</Label>
                <Input
                  id="quantidade_disponivel"
                  type="number"
                  {...register("quantidade_disponivel")}
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="quantidade_minima">Quant. Mínima</Label>
                <Input
                  id="quantidade_minima"
                  type="number"
                  {...register("quantidade_minima")}
                />
              </div>
            </div>

            {/* Data e Categoria */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="data_vencimento">Data Vencimento</Label>
                <Input
                  id="data_vencimento"
                  type="date"
                  {...register("data_vencimento")}
                />
              </div>
              <Select {...register("categorias")}>
                <SelectTrigger className="w-1/2 mt-5">
                  <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="lanches">Lanches</SelectItem>
                    <SelectItem value="doces">Doces</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Preços */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="preco_compra">Preço Compra</Label>
                <Input
                  id="preco_compra"
                  type="number"
                  {...register("preco_compra")}
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="preco_venda">Preço Venda</Label>
                <Input
                  id="preco_venda"
                  type="number"
                  {...register("preco_venda")}
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Digite a descrição do produto"
                {...register("descricao")}
              />
            </div>

            {/* Marca, Fornecedor, Modelo */}
            <div>
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" type="text" {...register("marca")} />
            </div>
            <div>
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input id="fornecedor" type="text" {...register("fornecedor")} />
            </div>
            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" type="text" {...register("modelo")} />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit">Salvar mudanças</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
