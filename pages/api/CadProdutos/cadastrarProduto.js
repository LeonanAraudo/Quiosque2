import produto from '../../../models/Produto/produto'
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() }).single('Foto');

export const config = {
    api: {
        bodyParser: false, 
    },
};

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    upload(req, res, async (err) => {
        if (err) {
            console.error('Error processing file:', err);
            return res.status(500).json({ error: 'Error processing file' });
        }
        
        console.log("🟡 req.file:", req.file); // Verifica se a imagem chegou
        console.log("🟡 req.body:", req.body); // Verifica se os dados chegaram corretamente

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const {
                Nome,
                Preco_Venda,
                Preco_Compra,
                Descricao,
                Marca,
                Fornecedor,
                Quantidade_Disponivel,
                Categoria,
                Quantidade_Minima,
                Modelo,
                Data_Vencimento,
            } = req.body;

            // Converte números corretamente
            const produtoData = {
                Nome,
                Descricao,
                Categoria,
                Marca,
                Fornecedor,
                Modelo,
                Data_Vencimento,
                Preco_Venda: parseFloat(Preco_Venda),
                Preco_Compra: parseFloat(Preco_Compra),
                Quantidade_Disponivel: parseInt(Quantidade_Disponivel, 10),
                Quantidade_Minima: parseInt(Quantidade_Minima, 10),
            };

            console.log("🟢 Dados antes de salvar:", produtoData);

            const uploadStream = cloudinary.uploader.upload_stream({
                folder: 'quiosque2',
            }, async (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({ error: 'Error uploading to Cloudinary', details: error.message });
                }

                const imageUrl = result.secure_url;
                produtoData.Foto = imageUrl; // Adiciona a URL da imagem ao objeto

                const createProduto = await produto.create(produtoData);
                res.status(201).json(createProduto);
            });

            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

        } catch (error) {
            console.error('Error creating produto:', error);
            res.status(500).json({ error: 'Failed to create produto', details: error.message });
        }
    });
}
