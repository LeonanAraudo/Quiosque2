import item_comanda from "../../../../../models/item_comanda/produtoComanda";

export default async function comandaCozinha(req, res) {
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { entregue } = req.body; 

      if (!id) {
        return res.status(400).json({ message: "Id da item_comanda não informado" });
      }

      const [updated] = await item_comanda.update(
        { entregue },
        { where: { id } }
      );

      if (updated === 0) {
        return res.status(404).json({ message: "item_Comanda não encontrada" });
      }

      return res.status(200).json({ message: "item_Comanda atualizada com sucesso!", entregue });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar item_Comanda", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
