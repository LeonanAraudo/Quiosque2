import comanda from '../../../../models/comanda/comanda'

export default async function getComandaById(req, res) {
  if (req.method === "GET") {
    try {
      const { comanda_id } = req.query;

      if (!comanda_id) {
        return res.status(400).json({ message: "Id da comanda não informado" });
      }

      const comandaEncontrada = await comanda.findOne(
        { where: { comanda_id } }
      );

       if (!comandaEncontrada) {
        return res.status(404).json({ message: "Comanda não encontrada" });
      }

      return res.status(200).json(comandaEncontrada);

    } catch (error) {
      console.error('Erro ao buscar comanda:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
