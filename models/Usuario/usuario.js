import DataTypes from 'sequelize';
import sequelize from '../../config/database.js';

const usuario = sequelize.define('usuario', {
      usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
      tableName: 'usuario',
      timestamps: false
    });
  
export default usuario;
  