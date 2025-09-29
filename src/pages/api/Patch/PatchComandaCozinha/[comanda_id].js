import comanda from '../../../../../models/comanda/comanda'

export default async function comandaCozinha(req, res) {
  if (req.method === "PATCH") {
    try {
      const { comanda_id } = req.query;

      if (!comanda_id) {
        return res.status(400).json({ message: "Id da comanda não informado" });
      }

      const [updated] = await comanda.update(
        { nacozinha: true },
        { where: { comanda_id } }
      );

      if (updated === 0) {
        return res.status(404).json({ message: "Comanda não encontrada" });
      }

      return res.status(200).json({ message: "Comanda enviada para a cozinha com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar comanda", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
