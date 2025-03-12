import produto from "../../../../models/Produto/produto";

export default async function handler(req, res) {
    if (req.method === "PATCH") {
        try {
            const { produto_id, ...dadosAtualizados } = req.body;

            if (!produto_id) {
                return res.status(400).json({ error: "O ID do produto é obrigatório" });
            }

            // Atualiza o produto no banco de dados
            const [updated] = await produto.update(dadosAtualizados, {
                where: { produto_id },
            });

            if (updated === 0) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            // Retorna os dados atualizados
            const produtoAtualizado = await produto.findByPk(produto_id);
            return res.status(200).json(produtoAtualizado);

        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}
