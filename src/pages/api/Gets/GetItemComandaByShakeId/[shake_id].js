import item_comanda from "../../../../../models/item_comanda/produtoComanda";

export default async function getItemComandaByShakeId(req, res) {
  if (req.method === "GET") {
    try {
      const { shake_id } = req.query;
      if (!shake_id) {
        return res.status(400).json({ message: "shake_id não informado" });
      }
      const item = await item_comanda.findOne({ where: { shake_id } });
      if (!item) {
        return res.status(404).json({ message: "item_comanda não encontrado" });
      }
      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar item_comanda", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
