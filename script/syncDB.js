import sequelize from '../config/database.js';
import '../models/Produto/produto.js'
import '../models/ShakeOptions/options.js'
import '../models/Usuario/usuario.js'

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

syncDb()
