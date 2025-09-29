import item_comanda from "../../../../../models/item_comanda/produtoComanda";
import produto from "../../../../../models/Produto/produto";

export default async function postItemComanda(req, res) {
    if (req.method === "POST") {
        try {
            const { comanda_id, produto_id, quantidade } = req.body;

            if (!comanda_id) {
                return res.status(400).json({ message: "Id da comanda não informado" });
            }
            if (!produto_id) {
                return res.status(400).json({ message: "Id do produto não informado" });
            }
            if (!quantidade) {
                return res.status(400).json({ message: "Quantidade do produto não informada" });
            }

            const prod = await produto.findByPk(produto_id);

            if (!prod) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            if (prod.quantidade_disponivel < quantidade) {
                return res.status(400).json({ message: "Estoque insuficiente" });
            }

            const cadItemComanda = await item_comanda.create({
                quantidade,
                comanda_id,
                produto_id
            });

            await produto.update(
                { quantidade_disponivel: prod.quantidade_disponivel - quantidade },
                { where: { produto_id } }
            );

            return res.status(200).json(cadItemComanda);
        } catch (error) {
            console.error('Erro ao cadastrar item da comanda:', error);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
}
