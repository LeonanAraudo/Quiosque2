import { Op } from "sequelize";
import  produto  from "../../../../../models/Produto/produto"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }
  try {
    const { categorias } = req.query;
    if (!categorias) {
      return res.status(400).json({ error: "Categoria não informada" });
    }

    const produtos = await produto.findAll({
      where: {
        categorias: { [Op.eq]: categorias }, 
      },
      order: [["nome", "ASC"]],
    });

    return res.status(200).json(produtos);
  } catch (error) {
    console.error("ERRO AO BUSCAR PRODUTOS:", error);
    return res.status(500).json({ error: "Erro ao buscar produtos", detalhes: error.message });
  }
  
}
