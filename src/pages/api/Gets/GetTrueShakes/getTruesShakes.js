import shakeOptions from '../../../../../models/ShakeOptions/options'
export default async function getShakes(req,res){
    if(req.method === "GET"){
        console.log('GET /api/Gets/GetAllShakes - Buscando todos os shakes');
        try{
            const reqShake = await shakeOptions.findAll({
                where: { nacozinha: true }  
            })

            console.log('Shakes encontrados:', reqShake ? reqShake.length : 0);
            
            if(reqShake && reqShake.length > 0){
                res.status(200).json(reqShake)
            }else{
                console.log('Nenhum shake encontrado');
                res.status(404).json({message: "Nenhum shake encontrado"})
            }
        }catch(error){
            console.error('Erro ao buscar shakes:', error);
            res.status(500).json({error: "erro ao buscar o shake", details: error.message})
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`)
    }
}