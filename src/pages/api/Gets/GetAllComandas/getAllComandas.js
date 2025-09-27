import comanda from '../../../../../models/comanda/comanda'

export default async function getShakes(req,res){
    if(req.method === "GET"){
        try{
            const reqAllComandas  = await comanda.findAll({
                order: [['tempo', 'ASC']] // Ordena por tempo, mais antiga primeiro
            })
            if(reqAllComandas){
                res.status(200).json(reqAllComandas)
            }else{
                res.status(401).json("comanda não encotrada")
            }
        }catch(error){
            res.status(500).json({error: "erro ao buscar o comanda"})
        }
    }
    else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`)
    }
}