import produto from "../../../../../models/Produto/produto";
import { Op } from "sequelize";

export default async function getProdutoById(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Método não permitido" });
    }
    try {
        const { comanda_id } = req.query; 

        if (!comanda_id) {
            return res.status(400).json({ error: "comanda_id não informado" });
        }

        const response = await fetch(`http://localhost:3000/api/GeTitemComanda/${comanda_id}`);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Isso aqui e a data", data)
        if (!data.produto_id && !data.length) {
            return res.status(404).json({ error: "Produto não encontrado para esta comanda" });
        }
        const produtoIds = Array.isArray(data) 
            ? data.map(item => item.produto_id) 
            : [data.produto_id];

        const produtos = await produto.findAll({
            where: {
                produto_id: produtoIds
            }
        });

        if (!produtos) {
            return res.status(404).json({ error: "Produtos não encontrados" });
        }

        return res.status(200).json(produtos);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({ 
            error: "Erro interno do servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}