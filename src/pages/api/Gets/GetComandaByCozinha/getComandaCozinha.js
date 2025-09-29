import comanda from "../../../../../models/comanda/comanda";

export default async function getComandaNaCozinha(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const comandaCozinha = await comanda.findAll({
      where: {
        nacozinha: true
      }
    });

    return res.status(200).json(comandaCozinha);
  } catch (error) {
    console.error("Erro ao buscar comandas na cozinha:", error);
    return res.status(500).json({ error: "Erro ao buscar comandas na cozinha" });
  }
}
