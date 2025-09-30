import shakeOptions from '../../../../../models/ShakeOptions/options'

export default async function getShakesById(req,res){
    if(req.method === "GET"){
        const {shake_id} = req.query;
        
        console.log('API GetShakeById - Recebido shake_id:', shake_id);
        
        if (!shake_id || isNaN(shake_id)) {
            console.log('API GetShakeById - Erro: shake_id inválido:', shake_id);
            return res.status(400).json({ error: "shake_id inválido" });
        }
        
        try{
            const numericShakeId = parseInt(shake_id, 10);
            const reqShake = await shakeOptions.findByPk(numericShakeId)
            console.log('API GetShakeById - Resultado da busca:', reqShake);
            
            if(reqShake){
                res.status(200).json(reqShake)
            }else{
                console.log('API GetShakeById - Shake não encontrado');
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