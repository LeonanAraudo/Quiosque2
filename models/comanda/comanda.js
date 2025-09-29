import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const comanda = sequelize.define('comanda', {
  comanda_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tempo: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  mesa: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nacozinha: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  numerocomanda: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nome:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'comanda',
  timestamps: false
});

export default comanda;
