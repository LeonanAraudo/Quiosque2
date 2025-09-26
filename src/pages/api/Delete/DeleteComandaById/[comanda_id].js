import comanda from "../../../../../models/comanda/comanda";

export default async function deleteComandaDebug(req, res) {
    if (req.method === "DELETE") {
        try {
            const { comanda_id } = req.query;
            console.log("=== DEBUG DELETE COMANDA ===");
            console.log("ID recebido:", comanda_id);
            console.log("Tipo do ID:", typeof comanda_id);
            
            if (!comanda_id) {
                console.log("❌ ID não fornecido");
                return res.status(400).json({ error: "O ID da comanda é obrigatório" });
            }

            // Primeiro, verificar se a comanda existe
            const comandaExiste = await comanda.findByPk(comanda_id);
            console.log("Comanda encontrada:", comandaExiste ? "SIM" : "NÃO");
            
            if (!comandaExiste) {
                console.log("❌ Comanda não encontrada no banco");
                return res.status(404).json({ error: "Comanda não encontrada" });
            }

            // Tentar deletar
            console.log("Tentando deletar comanda...");
            const deletedCount = await comanda.destroy({
                where: { comanda_id: comanda_id }
            });
            
            console.log("✅ Registros deletados:", deletedCount);
            console.log("=== FIM DEBUG ===");
            
            return res.status(200).json({ 
                message: "Comanda deletada com sucesso",
                deletedCount: deletedCount 
            });
            
        } catch (error) {
            console.error("❌ ERRO COMPLETO:", error);
            console.error("Stack trace:", error.stack);
            return res.status(500).json({ 
                error: "Erro interno do servidor",
                details: error.message,
                code: error.code || 'UNKNOWN'
            });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}