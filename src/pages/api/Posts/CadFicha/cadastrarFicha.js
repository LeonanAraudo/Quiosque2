import Ficha from '../../../../../models/Ficha/ficha';

export default async function cadastrarFicha(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    try {
        const { nome_produto, quantidade } = req.body;

        if (!nome_produto || quantidade === undefined) {
            return res.status(400).json({ 
                error: 'Nome do produto e quantidade são obrigatórios' 
            });
        }

        if (quantidade < 0) {
            return res.status(400).json({ 
                error: 'Quantidade não pode ser negativa' 
            });
        }

        const novaFicha = await Ficha.create({
            nome_produto,
            quantidade,
            data_cadastro: new Date()
        });

        return res.status(201).json(novaFicha);
    } catch (error) {
        console.error('Erro ao cadastrar ficha:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
