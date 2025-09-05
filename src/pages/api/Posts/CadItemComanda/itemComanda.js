import item_comanda from "../../../../../models/item_comanda/produtoComanda";

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
                return res.status(400).json({ message: "Quantidade do produto não informado" });
            }

            const cadItemComanda = await item_comanda.create({
                quantidade,
                comanda_id,
                produto_id
            })
            return res.status(200).json(cadItemComanda)
        } catch (error) {
            console.error('Erro ao cadastrar item da comanda:', error);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
}