import shakeOptions from "../../../../../models/ShakeOptions/options";

export default async function entregarShake(req, res) {
  if (req.method === "PATCH") {
    try {
      const { shake_id } = req.query;
      const { entregue = true } = req.body;

      if (!shake_id) {
        return res.status(400).json({ message: "shake_id não informado" });
      }

      const [updated] = await shakeOptions.update(
        { entregue },
        { where: { shake_id } }
      );

      if (updated === 0) {
        return res.status(404).json({ message: "Shake não encontrado" });
      }

      return res.status(200).json({ message: "Shake entregue com sucesso!", entregue });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao entregar shake", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
