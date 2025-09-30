import item_comanda from "../../../../../models/item_comanda/produtoComanda";
import createShakes from "../CadShake/shakeOptions";

export default async function cadShakeComanda(req, res) {
    if (req.method === "POST") {
        try {
            // Extrair dados do body
            let { tamanho, sabor, cobertura, adicionais, nome } = req.body;
            const { comanda_id } = req.body;

            // Validação dos dados obrigatórios
            if (!comanda_id) {
                return res.status(400).json({ error: "comanda_id é obrigatório" });
            }

            if (!tamanho || !sabor) {
                return res.status(400).json({ error: "tamanho e sabor são obrigatórios" });
            }

            // Log dos dados recebidos
            console.log("Dados recebidos:", { tamanho, sabor, cobertura, adicionais, nome, comanda_id });

            // Preparar requisição mock para criar shake
            const mockReq = {
                method: "POST",
                body: {
                    tamanho,
                    sabor,
                    cobertura,
                    adicionais,
                    nome
                }
            };

            const mockRes = {
                status: function(code) {
                    this.statusCode = code;
                    return this;
                },
                json: function(data) {
                    this.data = data;
                    return this;
                }
            };

            // Criar o shake
            await createShakes(mockReq, mockRes);

            if (mockRes.statusCode !== 200) {
                console.error("Erro ao criar shake:", mockRes.data);
                return res.status(mockRes.statusCode).json(mockRes.data);
            }

            const shakeData = mockRes.data;
            // Validar resposta do shake criado
            const shakeId = shakeData.shake_id;
            if (!shakeData || !shakeId) {
                console.error("Dados inválidos do shake:", shakeData);
                return res.status(400).json({ 
                    error: "Erro ao cadastrar o shake.",
                    details: "Resposta inválida do servidor"
                });
            }

            // Criar item na comanda
            const novoItem = await item_comanda.create({
                comanda_id,
                shake_id: shakeId,
                quantidade: 1
            });

            return res.status(201).json({
                message: "Shake cadastrado e vinculado à comanda com sucesso!",
                item: novoItem,
            });
        } catch (error) {
            console.error("Erro completo:", error);

            // Se for erro do Sequelize
            if (error.name === 'SequelizeError' || error.name === 'SequelizeValidationError') {
                console.error("Erro do Sequelize:", error);
                return res.status(500).json({ 
                    error: "Erro ao salvar no banco de dados",
                    details: error.errors?.map(e => e.message)
                });
            }

            // Erro genérico
            console.error("Erro ao cadastrar shake na comanda:", {
                message: error.message,
                stack: error.stack
            });
            return res.status(500).json({ 
                error: "Erro interno ao cadastrar shake.",
                details: error.message
            });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido." });
    }
}
