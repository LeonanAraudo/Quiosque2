import produto from "../../../../models/Produto/produto";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const upload = multer({ storage: multer.memoryStorage() }).single("foto");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }

  upload(req, res, async (err) => {
    if (err) {
      console.error("Erro no upload:", err);
      return res.status(500).json({ error: "Erro ao processar imagem" });
    }

    const { produto_id } = req.query;

    if (!produto_id) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    try {
      const {
        nome,
        preco_venda,
        preco_compra,
        descricao,
        marca,
        fornecedor,
        quantidade_disponivel,
        categorias,
        quantidade_minima,
        modelo,
        data_vencimento,
      } = req.body;

      const dadosAtualizados = {
        nome,
        descricao,
        categorias,
        marca,
        fornecedor,
        modelo,
        data_vencimento,
        preco_venda: preco_venda ? parseFloat(preco_venda) : undefined,
        preco_compra: preco_compra ? parseFloat(preco_compra) : undefined,
        quantidade_disponivel: quantidade_disponivel ? parseInt(quantidade_disponivel, 10) : undefined,
        quantidade_minima: quantidade_minima ? parseInt(quantidade_minima, 10) : undefined,
      };

      // Se houver imagem, envia para o Cloudinary
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "quiosque2",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        dadosAtualizados.foto = result.secure_url;
      }

      // Remove campos undefined
      Object.keys(dadosAtualizados).forEach((key) => {
        if (dadosAtualizados[key] === undefined) delete dadosAtualizados[key];
      });

      // Atualiza o produto
      const [updated] = await produto.update(dadosAtualizados, {
        where: { produto_id: parseInt(produto_id) },
      });

      if (updated === 0) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      const produtoAtualizado = await produto.findByPk(produto_id);
      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({ error: "Erro interno do servidor", detail: error.message });
    }
  });
}
