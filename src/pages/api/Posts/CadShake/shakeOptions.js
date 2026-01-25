import pg from 'pg';
import shakeOptions from '../../../../../models/ShakeOptions/options';
import item_comanda from '../../../../../models/item_comanda/produtoComanda';

export default async function createShakes(req, res) {
  if (req.method === "POST") {
    try {
      let { tamanho, sabor, cobertura, adicionais, nome, paralevar, comanda_id } = req.body;

      if (!tamanho || !sabor) {
        return res.status(400).json({ error: "tamanho e sabor são obrigatórios" });
      }

      if (!nome || nome.trim() === "") {
        nome = "Guaraná da Amazônia";
      }

      // Converte comanda_id para número inteiro se existir
      const comandaIdNumero = comanda_id ? parseInt(comanda_id, 10) : null;

      const ultimoShake = await shakeOptions.findOne({
        order: [['numero_comanda', 'DESC']],
      });

      const numero_comanda = ultimoShake ? ultimoShake.numero_comanda + 1 : 1;

      const postShake = await shakeOptions.create({
        tamanho,
        sabor,
        cobertura,
        nome,
        paralevar,
        numero_comanda,
        adicionais: Array.isArray(adicionais) ? adicionais.join(", ") : adicionais,
        nacozinha: true
      });

      let itemComanda = null;
      if (comandaIdNumero) {
        itemComanda = await item_comanda.create({
          comanda_id: comandaIdNumero,
          shake_id: postShake.shake_id,
          quantidade: 1
        });
      }

      return res.status(201).json({
        message: "Shake cadastrado com sucesso!",
        shake: postShake,
        itemComanda
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar shake", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
