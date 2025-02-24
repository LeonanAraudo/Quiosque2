import { DataTypes } from "sequelize";
import sequelize  from '../../config/database';

const produto = sequelize.define('produtos',{
 produto_id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
 },
 nome:{
    type: DataTypes.STRING,
    allowNull:true
 },
 descricao:{
    type: DataTypes.STRING,
    allowNull:true
 },
 categorias:{
    type: DataTypes.STRING,
    allowNull:true
 },
 quantidade_disponivel:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 marca:{
    type: DataTypes.STRING,
    allowNull:true
 },
 preco_venda:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 preco_compra:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 fornecedor:{
    type: DataTypes.STRING,
    allowNull:true
 },
 data_vencimento:{
    type: DataTypes.DATE,
    allowNull:true
 },
 data_cadastro:{
   type: DataTypes.DATE,
   allowNull:true
},
 quantidade_minima:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 modelo:{
   type: DataTypes.STRING,
   allowNull:true
},
 foto:{
    type: DataTypes.STRING,
    allowNull:true
 }
},{
 tableName: 'produtos',
 timestamps: false
})

export default produto