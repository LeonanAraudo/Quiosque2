import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js';

const Ficha = sequelize.define('fichas', {
    ficha_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'fichas',
    timestamps: false
});

export default Ficha;
