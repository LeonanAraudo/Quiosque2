"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../../components/ui/table"
import { useItensComanda } from "../../../../../../hook/ItensComanda/useItensComanda"
import { useEffect, useState } from "react";

export default function ProdutosComanda({ comanda_id }) {
    const { itens: produtos, isLoading: loading } = useItensComanda(comanda_id)
    const [total, setTotal] = useState(0);

     const calcularTotal = () => {
        return produtos.reduce((total, item) => {
            let precoVenda = 0;

            if (item.produto && item.produto.nome) {
                precoVenda = parseFloat(item.produto.preco_venda) || 0;
            } else if (item.shake && item.shake.tamanho) {
                const tamanho = item.shake.tamanho.toLowerCase().trim();
                if (tamanho === "400ml") precoVenda = 10;
                else if (tamanho === "500ml") precoVenda = 12;
                else precoVenda = 10;
            }

            const quantidade = parseInt(item.quantidade) || 0;
            return total + precoVenda * quantidade;
        }, 0);
    };

    useEffect(() => {
        const totalAtual = calcularTotal();
        setTotal(totalAtual);
        localStorage.setItem(`total_comanda_${comanda_id}`, totalAtual);
    }, [produtos]);

    if (loading) {
        return (
            <div className="w-[90%] mx-auto">
                <Table>
                    <TableCaption>Carregando produtos...</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Qtd</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço Unit.</TableHead>
                            <TableHead>Feito</TableHead> 
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Carregando...
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="w-[95%] mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Qtd</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço Unit.</TableHead>
                        <TableHead>Feito</TableHead> 
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {produtos.length > 0 ? (
                        produtos.map((item) => {
                            const nomeItem = item.produto?.nome || item.shake?.nome || "Sem nome";
                            let precoVenda = 0;

                            if (item.produto && item.produto.nome) {
                                precoVenda = parseFloat(item.produto.preco_venda) || 0;
                            } else if (item.shake && item.shake.tamanho) {
                                const tamanho = item.shake.tamanho.toLowerCase().trim();

                                if (tamanho === "400ml") precoVenda = 10;
                                else if (tamanho === "500ml") precoVenda = 12;
                                else precoVenda = 10;
                            }
                            const quantidade = parseInt(item.quantidade) || 0;
                            const totalItem = precoVenda * quantidade;

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{quantidade}</TableCell>
                                    <TableCell>{nomeItem}</TableCell>
                                    <TableCell>R$ {precoVenda.toFixed(2)}</TableCell>
                                    <TableCell> 
                                        {item.entregue ? "✅" : "❌"}
                                    </TableCell>
                                    <TableCell className="text-right">R$ {totalItem.toFixed(2)}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center"> 
                                Nenhum produto encontrado
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="font-medium">Total Geral</TableCell>
                        <TableCell className="text-right w-[150px] font-medium">
                            R$ {calcularTotal().toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}