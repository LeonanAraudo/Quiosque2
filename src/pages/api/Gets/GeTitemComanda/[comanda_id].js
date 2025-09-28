import item_comanda from "../../../../../models/item_comanda/produtoComanda";
import produto from "../../../../../models/Produto/produto";
import shakeOptions from "../../../../../models/ShakeOptions/options";

export default async function getComandaById(req, res) {
  if (req.method === "GET") {
    try {
      const { comanda_id } = req.query;
      if (!comanda_id) {
        return res.status(400).json({ message: "Id da comanda não informado" });
      }

      // Busca os itens da comanda
      const comandaEncontrada = await item_comanda.findAll({
        where: { comanda_id },
      });


      // Extrai os IDs dos produtos e shakes
      const produtoIds = comandaEncontrada
        .filter(item => item.produto_id)
        .map(item => item.produto_id);
      const shakeIds = comandaEncontrada
        .filter(item => item.shake_id)
        .map(item => item.shake_id);

      // Busca os produtos correspondentes (só se houver IDs)
      const produtosEncontrados = produtoIds.length > 0 
        ? await produto.findAll({
            where: { produto_id: produtoIds },
          })
        : [];

      // Busca os shakes correspondentes (só se houver IDs)
      const shakesEncontrados = shakeIds.length > 0
        ? await shakeOptions.findAll({
            where: { shake_id: shakeIds },
          })
        : [];

      // Mescla os dados do item_comanda com os detalhes do produto ou shake
      const itensFormatados = comandaEncontrada.map(item => {
        const produtoCorrespondente = produtosEncontrados.find(
          prod => prod.produto_id === item.produto_id
        );
        const shakeCorrespondente = shakesEncontrados.find(
          shake => shake.shake_id === item.shake_id
        );

        return {
          id: item.id,
          comanda_id: item.comanda_id,
          produto_id: item.produto_id,
          shake_id: item.shake_id,
          quantidade: item.quantidade,
          produto: produtoCorrespondente || {},
          shake: shakeCorrespondente || {},
        };
      });

      return res.status(200).json({
        success: true,
        comanda_id,
        total_itens: itensFormatados.length,
        itens: itensFormatados,
      });

    } catch (error) {
      console.error('Erro ao buscar comanda:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Erro no servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
