
import produto from "../../../../models/Produto/produto";

export default async function deleteProduto(req,res){
    if(req.method === "DELETE"){
        try{
            const {produto_id} = req.query;
            console.log("produto id recebido: " + produto_id)
            if (!produto_id) {
                return res.status(400).json({ error: "O ID do produto é obrigatório" });
            }

            const delet = await produto.destroy({
                where: { produto_id: parseInt(produto_id)}
            });
            
            if(!delet){
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            return res.status(200).json("Produto deletado");
        }catch(error){
            return res.status(500).json({ error: "Erro interno do servidor" });

        }
    }else{
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}