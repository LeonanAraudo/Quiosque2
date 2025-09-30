import { DataTypes, INET, INTEGER } from "sequelize";
import sequelize from '../../config/database.js';

const item_comanda = sequelize.define('item_comanda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    comanda_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'comanda',
            key: 'comanda_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'produtos',
            key: 'produto_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    entregue: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    shake_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'shakeoptions',
            key: 'shake_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantidade: {
        type: INTEGER,
        allowNull: true
    }
}, {
    tableName: 'item_comanda',
    timestamps: false
})

export default item_comanda