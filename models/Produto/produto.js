import { DataTypes } from "sequelize";
import sequelize  from '../../config/database';

const produto = sequelize.define('Produtos',{
 Produto_Id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
 },
 Nome:{
    type: DataTypes.STRING,
    allowNull:true
 },
 Descricao:{
    type: DataTypes.STRING,
    allowNull:true
 },
 Categoria:{
    type: DataTypes.STRING,
    allowNull:true
 },
 Quantidade_Disponivel:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 Marca:{
    type: DataTypes.STRING,
    allowNull:true
 },
 Preco_Venda:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 Preco_Compra:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 Fornecedor:{
    type: DataTypes.STRING,
    allowNull:true
 },
 Data_Vencimento:{
    type: DataTypes.DATE,
    allowNull:true
 },
 Quantidade_Minima:{
    type: DataTypes.INTEGER,
    allowNull:true
 },
 Foto:{
    type: DataTypes.STRING,
    allowNull:true
 }
},{
 tableName: 'produto',
 timestamps: false
})

export default produto