import { DataTypes } from "sequelize";
import sequelize  from '../../config/database.js';

const shakeOptions = sequelize.define('shakeOptions',{
 shake_id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
 },
 tamanho:{
    type: DataTypes.STRING,
    allowNull:true
 },
 sabor:{
    type: DataTypes.STRING,
    allowNull:true
 },
 cobertura:{
    type: DataTypes.STRING,
    allowNull:true
 },
 adicionais:{
    type: DataTypes.STRING,
    allowNull:true
 },
 nome:{
    type: DataTypes.STRING,
    allowNull:true
 },
 numero_comanda:{
   type: DataTypes.INTEGER,
   allowNull:true
},
 
},{
 tableName: 'shakeoptions',
 timestamps: false
})

export default shakeOptions