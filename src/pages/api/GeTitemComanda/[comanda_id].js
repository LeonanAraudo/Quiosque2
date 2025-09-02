import item_comanda from "../../../../models/item_comanda/produtoComanda";
import produto from "../../../../models/Produto/produto";

export default async function getComandaById(req, res) {
    if (req.method === "GET") {
        try {
            const { comanda_id } = req.query;

            if (!comanda_id) {
                return res.status(400).json({ message: "Id da comanda não informado" });
            }

            // Busca os itens da comanda
            const comandaEncontrada = await item_comanda.findAll({
                where: { comanda_id }
            });

            if (!comandaEncontrada || comandaEncontrada.length === 0) {
                return res.status(404).json({ message: "Comanda não encontrada" });
            }

            // Extrai os IDs dos produtos
            const produtoIds = comandaEncontrada.map(item => item.produto_id);

            // Busca os produtos correspondentes
            const produtosEncontrados = await produto.findAll({
                where: {
                    produto_id: produtoIds
                }
            });

            // Mescla os dados do item_comanda com os detalhes do produto
            const itensFormatados = comandaEncontrada.map(item => {
                const produtoCorrespondente = produtosEncontrados.find(
                    prod => prod.produto_id === item.produto_id
                );
                
                return {
                    id: item.id,
                    comanda_id: item.comanda_id,
                    produto_id: item.produto_id,
                    quantidade: item.quantidade,
                    produto: {
                        produto_id: produtoCorrespondente?.produto_id,
                        nome: produtoCorrespondente?.nome,
                        descricao: produtoCorrespondente?.descricao,
                        categorias: produtoCorrespondente?.categorias,
                        quantidade_disponivel: produtoCorrespondente?.quantidade_disponivel,
                        marca: produtoCorrespondente?.marca,
                        preco_venda: produtoCorrespondente?.preco_venda,
                        preco_compra: produtoCorrespondente?.preco_compra,
                        fornecedor: produtoCorrespondente?.fornecedor,
                        data_vencimento: produtoCorrespondente?.data_vencimento,
                        data_cadastro: produtoCorrespondente?.data_cadastro,
                        quantidade_minima: produtoCorrespondente?.quantidade_minima,
                        modelo: produtoCorrespondente?.modelo,
                        foto: produtoCorrespondente?.foto,
                    }
                };
            });

            return res.status(200).json({
                success: true,
                comanda_id: comanda_id,
                total_itens: itensFormatados.length,
                itens: itensFormatados
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