
import shakeOptions from "../../../../../models/ShakeOptions/options";

export default async function deleteShake(req,res){
    if(req.method === "DELETE"){
        try{
            const {shake_id} = req.query;
            console.log("shake id recebido: " + shake_id)
            if (!shake_id) {
                return res.status(400).json({ error: "O ID do shake é obrigatório" });
            }

            const delet = await shakeOptions.destroy({
                where: { shake_id: parseInt(shake_id)}
            });
            
            if(!delet){
                return res.status(404).json({ error: "shake não encontrado" });
            }

            return res.status(200).json("shake deletado");
        }catch(error){
            return res.status(500).json({ error: "Erro interno do servidor" });

        }
    }else{
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}