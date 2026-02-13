import Ficha from '../../../../../models/Ficha/ficha';

export default async function deleteFicha(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    try {
        const { ficha_id } = req.query;

        if (!ficha_id) {
            return res.status(400).json({ error: 'O ID da ficha é obrigatório' });
        }

        const deletada = await Ficha.destroy({
            where: { ficha_id: parseInt(ficha_id) }
        });

        if (!deletada) {
            return res.status(404).json({ error: 'Ficha não encontrada' });
        }

        return res.status(200).json({ message: 'Ficha deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar ficha:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
