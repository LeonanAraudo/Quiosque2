import produto from '../../../../../models/Produto/produto'
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';
import 'dotenv/config';
import dayjs from "dayjs";

// 🔍 Verifica se as variáveis de ambiente estão carregadas corretamente
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("❌ Cloudinary environment variables are missing!");
    process.exit(1);
}

// ✅ Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// ✅ Configuração do Multer para armazenar a imagem na memória
const upload = multer({ storage: multer.memoryStorage() }).single('foto');

export const config = {
    api: {
        bodyParser: false, // Necessário para processar arquivos
    },
};

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    upload(req, res, async (err) => {
        if (err) {
            console.error('❌ Error processing file:', err);
            return res.status(500).json({ error: 'Error processing file' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            // 📌 Extraindo dados do corpo da requisição
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

            const produtoData = {
                nome,
                descricao,
                categorias,
                marca,
                fornecedor,
                modelo,
                data_vencimento,
                preco_venda: parseFloat(preco_venda),
                preco_compra: parseFloat(preco_compra),
                quantidade_disponivel: parseInt(quantidade_disponivel, 10),
                quantidade_minima: parseInt(quantidade_minima, 10),
                data_cadastro:dayjs().format("YYYY-MM-DD")
            };


            // ✅ Upload da imagem usando stream

            const uploadFromBuffer = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "quiosque2",
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(stream);
                });
            };
            const result = await uploadFromBuffer(req.file.buffer);
            produtoData.foto = result.secure_url; // Adiciona a URL da imagem ao objeto

            // ✅ Salvar no banco de dados
            const createProduto = await produto.create(produtoData);
            return res.status(201).json(createProduto);
        
        } catch (error) {
            console.error('❌ Error creating produto:', error);
            return res.status(500).json({ error: 'Failed to create produto', details: error.message });
        }
    });
}
