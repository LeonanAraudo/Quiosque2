import comanda from '../../../../../models/comanda/comanda'

/**
 * API para buscar todas as comandas
 * GET /api/Gets/GetAllComandas/getAllComandas
 * Query params (opcionais): estado, mesa, limit, offset
 */
export default async function getAllComandas(req, res) {
    // Validação de método HTTP
    if (req.method !== "GET") {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ 
            message: `Método ${req.method} não permitido`,
            allowed: ['GET']
        });
    }

    try {
        // Extrair e validar query parameters
        const { estado, mesa, limit, offset } = req.query;

        // Construir filtros de forma segura
        const where = {};

        // Filtro por estado (se fornecido)
        if (estado) {
            const estadosValidos = ['aberta', 'fechada'];
            if (!estadosValidos.includes(estado)) {
                return res.status(400).json({ 
                    message: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`,
                    field: 'estado'
                });
            }
            where.estado = estado;
        }

        // Filtro por mesa (se fornecido)
        if (mesa) {
            const mesaNum = Number(mesa);
            if (!Number.isInteger(mesaNum) || mesaNum < 0) {
                return res.status(400).json({ 
                    message: "Mesa deve ser um número inteiro positivo",
                    field: 'mesa'
                });
            }
            where.mesa = mesaNum;
        }

        // Validar paginação
        const queryLimit = limit ? Math.min(Math.max(1, Number(limit)), 100) : 100;
        const queryOffset = offset ? Math.max(0, Number(offset)) : 0;

        // Buscar comandas com filtros
        const comandas = await comanda.findAll({
            where,
            order: [['tempo', 'ASC']], // Ordena por tempo, mais antiga primeiro
            limit: queryLimit,
            offset: queryOffset
        });

        // Retornar array vazio se não encontrar (não é erro)
        return res.status(200).json(comandas || []);

    } catch (error) {
        console.error('Erro ao buscar comandas:', error);
        
        // Não expor detalhes internos do erro em produção
        return res.status(500).json({ 
            message: "Erro ao buscar comandas",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}