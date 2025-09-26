import axios from "axios";
import item_comanda from "../../../../../models/item_comanda/produtoComanda";

export default async function cadShakeComanda(req, res) {
    if (req.method === "POST") {
        let { tamanho, sabor, cobertura, adicionais, nome } = req.body;
        const { comanda_id } = req.body;

        try {
            const shakeResponse = await axios.post(
                `http://localhost:3000/api/Posts/CadShake/shakeOptions`,
                {
                    tamanho,
                    sabor,
                    cobertura,
                    adicionais,
                    nome,
                }
            );

            const shakeData = shakeResponse.data;
            const shakeId = shakeData.shake_id;

            if (!shakeData || !shakeId) {
                return res.status(400).json({ error: "Erro ao cadastrar o shake." });
            }

            const novoItem = await item_comanda.create({
                comanda_id,
                shake_id: shakeId,
                quantidade: 1
            });

            return res.status(201).json({
                message: "Shake cadastrado e vinculado à comanda com sucesso!",
                item: novoItem,
            });
        } catch (error) {
            console.error("Erro ao cadastrar shake na comanda:", error.message);
            return res.status(500).json({ error: "Erro interno ao cadastrar shake." });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido." });
    }
}
