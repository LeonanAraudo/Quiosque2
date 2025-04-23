import shakeOptions from '../../../../models/ShakeOptions/options';

export default async function createShakes(req, res) {
  if (req.method === "POST") {
    try {
      const { tamanho, sabor, cobertura, adicionais, nome } = req.body;

      // Busca o maior número de comanda existente no banco
      const ultimoShake = await shakeOptions.findOne({
        order: [['numero_comanda', 'DESC']],
      });

      // Se não existir nenhuma comanda, começa do 1
      const numero_comanda = ultimoShake ? ultimoShake.numero_comanda + 1 : 1;

      const postShake = await shakeOptions.create({
        tamanho,
        sabor,
        cobertura,
        nome,
        numero_comanda,
        adicionais: Array.isArray(adicionais) ? adicionais.join(", ") : adicionais,
      });

      res.status(200).json(postShake);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar shake" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
