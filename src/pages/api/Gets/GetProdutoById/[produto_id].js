import produto from "../../../../../models/Produto/produto";
import { Op } from "sequelize";

export default async function getProdutoById(req,res){
if(req.method !== "GET"){
    return res.status(405).json({error: "Método não permitido"})
}
try{
    const {produto_id} = req.query;
    if(!produto_id){
        return res.status(400).json({error: "Id não informado"})
    }

    const produtoId = await produto.findAll({
        where: {
            produto_id: { [Op.eq]: produto_id}
        }
    })

    return res.status(200).json(produtoId);
}catch(error){
    return res.status(500).json({error: "Erro ao buscar produtoId"})
}
}