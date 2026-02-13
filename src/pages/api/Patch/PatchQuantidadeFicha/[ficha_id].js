import Ficha from '../../../../../models/Ficha/ficha';

export default async function updateQuantidadeFicha(req, res) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    try {
        const { ficha_id } = req.query;
        const { quantidade } = req.body;

        if (!ficha_id) {
            return res.status(400).json({ error: 'O ID da ficha é obrigatório' });
        }

        if (quantidade === undefined || quantidade < 0) {
            return res.status(400).json({ error: 'Quantidade inválida' });
        }

        const ficha = await Ficha.findByPk(ficha_id);

        if (!ficha) {
            return res.status(404).json({ error: 'Ficha não encontrada' });
        }

        await ficha.update({ quantidade });

        return res.status(200).json(ficha);
    } catch (error) {
        console.error('Erro ao atualizar quantidade da ficha:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
