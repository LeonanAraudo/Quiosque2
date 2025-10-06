import pg from 'pg';
import shakeOptions from '../../../../../models/ShakeOptions/options';

export default async function createShakes(req, res) {
  if (req.method === "POST") {
    try {
      let { tamanho, sabor, cobertura, adicionais, nome, paralevar } = req.body;

      if (!nome || nome.trim() === "") {
        nome = "Guaraná da Amazônia";
      }

      // Busca o maior número de comanda existente no banco
      const ultimoShake = await shakeOptions.findOne({
        order: [['numero_comanda', 'DESC']],
      });

      const numero_comanda = ultimoShake ? ultimoShake.numero_comanda + 1 : 1;

      const postShake = await shakeOptions.create({
        tamanho,
        sabor,
        cobertura,
        nome,
        numero_comanda,
        nacozinha: true,
        paralevar,
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
