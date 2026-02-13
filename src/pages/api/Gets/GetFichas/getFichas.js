import Ficha from '../../../../../models/Ficha/ficha';

export default async function getFichas(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    try {
        const fichas = await Ficha.findAll({
            order: [['data_cadastro', 'DESC']]
        });

        return res.status(200).json(fichas);
    } catch (error) {
        console.error('Erro ao buscar fichas:', error);
        return res.status(500).json({ error: 'Erro ao buscar fichas' });
    }
}
