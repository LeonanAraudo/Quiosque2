import comanda from '../../../../../models/comanda/comanda'

export default async function getComandas(req, res) {
  if (req.method === "GET") {
    try {
      const { mesa } = req.query;

      if (!mesa) {
        return res.status(400).json({ message: "Número da mesa não informado" });
      }

      const comandaEncontrada = await comanda.findOne(
        { where: { mesa } }
      );

      if (!comandaEncontrada) {
        return res.status(200).json({ estado: "fechada", comanda_id: null });
      }

      return res.status(200).json(comandaEncontrada);

    } catch (error) {
      console.error('Erro ao buscar comanda:', error);
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
