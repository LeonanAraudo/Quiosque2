import sequelize from '../../../../config/database'
import shakeOptions from '../../../../models/ShakeOptions/options'

export default async function GetProdutos(req,res){
    if(req.method === "GET"){
        try{
            const reqShake = await shakeOptions.findAll()
            if(reqShake){
                res.status(200).json(reqShake)
            }else{
                res.status(401).json("shake não encotrado")
            }
        }catch(error){
            res.status(500).json({error: "erro ao buscar o shake"})
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`)
    }
}