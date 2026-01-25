import comanda from '../../../../../models/comanda/comanda'

/**
 * API para abertura de comanda
 * POST /api/Posts/AberturaComanda/aberturaComanda
 * Body: { mesa: number | null, estado: string }
 */
export default async function abrirComanda(req, res) {
  // Validação de método HTTP
  if (req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      message: 'Método não permitido',
      allowed: ['POST']
    });
  }

  try {
    const { mesa, estado } = req.body

    // Validação de estado
    if (!estado || typeof estado !== 'string') {
      return res.status(400).json({ 
        message: "Estado é obrigatório e deve ser uma string",
        field: 'estado'
      });
    }

    // Validação de estado permitido
    const estadosValidos = ['aberta', 'fechada'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ 
        message: `Estado deve ser: ${estadosValidos.join(', ')}`,
        field: 'estado'
      });
    }

    // Validação de mesa (opcional, mas se fornecida deve ser válida)
    if (mesa !== null && mesa !== undefined) {
      const mesaNum = Number(mesa);
      if (!Number.isInteger(mesaNum) || mesaNum < 0 || mesaNum > 999) {
        return res.status(400).json({ 
          message: "Mesa deve ser um número inteiro entre 0 e 999 ou null",
          field: 'mesa'
        });
      }
    }

    // Sanitização: garantir que apenas campos permitidos sejam salvos
    const mesaSanitizada = mesa ? Number(mesa) : null;

    // Verificar se já existe comanda aberta para esta mesa
    if (mesaSanitizada) {
      const comandaExistente = await comanda.findOne({
        where: {
          mesa: mesaSanitizada,
          estado: 'aberta'
        }
      });

      if (comandaExistente) {
        return res.status(409).json({ 
          message: `Já existe uma comanda aberta para a mesa ${mesaSanitizada}`,
          comanda_id: comandaExistente.comanda_id
        });
      }
    }

    // Buscar todas as comandas para gerar número sequencial
    const todasComandas = await comanda.findAll({
      order: [['numerocomanda', 'DESC']],
      limit: 1
    });
    
    const proximoNumero = todasComandas.length > 0 
      ? (todasComandas[0].numerocomanda || 0) + 1 
      : 1;

    // Criar comanda com dados sanitizados
    const agora = new Date();
    const novaComanda = await comanda.create({  
        estado,
        mesa: mesaSanitizada,
        tempo: agora.toISOString(), 
        numerocomanda: proximoNumero,
    });

    // Retornar apenas dados necessários
    return res.status(201).json({
      success: true,
      comanda_id: novaComanda.comanda_id,
      numerocomanda: novaComanda.numerocomanda,
      mesa: novaComanda.mesa,
      estado: novaComanda.estado,
      tempo: novaComanda.tempo
    });

  } catch (error) {
    console.error('Erro ao abrir comanda:', error);
    
    // Não expor detalhes internos do erro
    return res.status(500).json({ 
      message: 'Erro ao processar solicitação',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}