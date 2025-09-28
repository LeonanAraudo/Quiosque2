import shakeOptions from '../../../../../models/ShakeOptions/options'

export default async function getShakesById(req,res){
    if(req.method === "GET"){
        const {shake_id} = req.query;
        
        if (!shake_id) {
            return res.status(400).json({ error: "shake_id não informado" });
        }
        
        try{
            const reqShake = await shakeOptions.findByPk(shake_id)
            if(reqShake){
                res.status(200).json(reqShake)
            }else{
                res.status(404).json({ error: "shake não encontrado" })
            }
        }catch(error){
            console.error('Erro ao buscar shake:', error);
            res.status(500).json({error: "erro ao buscar o shake"})
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`)
    }
}