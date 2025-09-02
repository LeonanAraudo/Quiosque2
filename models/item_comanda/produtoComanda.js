import { DataTypes, INET, INTEGER } from "sequelize";
import sequelize  from '../../config/database.js';

const item_comanda = sequelize.define('item_comanda',{
 id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
 },
comanda_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'comanda', 
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
produto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'produto',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
quantidade:{
    type: INTEGER,
    allowNull: true
    }
},{
 tableName: 'item_comanda',
 timestamps: false
})

export default item_comanda