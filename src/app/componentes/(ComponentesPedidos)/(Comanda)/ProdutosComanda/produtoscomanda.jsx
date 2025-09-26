"use client"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ProdutosComanda({ comanda_id }) {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProdutos = async () => {
            if (!comanda_id) return;

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`/api/Gets/GeTitemComanda/${comanda_id}`);
                const data = await response.json();

                console.log("Dados da API:", data);

                if (data && data.success && Array.isArray(data.itens)) {
                    setProdutos(data.itens);
                } else {
                    console.warn("API não retornou dados válidos:", data);
                    setProdutos([]);
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setError(error.message);
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [comanda_id]);

    const calcularTotal = () => {
        return produtos.reduce((total, item) => {
            let precoVenda = 0;
            if (item.produto) {
                precoVenda = parseFloat(item.produto.preco_venda) || 0;
            } else if (item.shake) {
                if (item.shake.tamanho === "400ml") precoVenda = 10;
                else if (item.shake.tamanho === "500ml") precoVenda = 12;
            }
            const quantidade = parseInt(item.quantidade) || 0;
            return total + precoVenda * quantidade;
        }, 0);
    };


    if (loading) {
        return (
            <div>
                <Table>
                    <TableCaption>Carregando produtos...</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Qtd</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço Unit.</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Carregando...
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Qtd</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço Unit.</TableHead>
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
                                else precoVenda = 10; // preço padrão para shakes com tamanho diferente
                            }
                            const quantidade = parseInt(item.quantidade) || 0;
                            const totalItem = precoVenda * quantidade;

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{quantidade}</TableCell>
                                    <TableCell>{nomeItem}</TableCell>
                                    <TableCell>R$ {precoVenda.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">R$ {totalItem.toFixed(2)}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Nenhum produto encontrado
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="font-medium">Total Geral</TableCell>
                        <TableCell className="text-right font-medium">
                            R$ {calcularTotal().toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}