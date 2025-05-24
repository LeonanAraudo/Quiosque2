import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('neondb', 'neondb_owner', 'npg_oIaQ7fHWReN9', {
  host: 'ep-falling-surf-a8ifwkt0-pooler.eastus2.azure.neon.tech',  // Host completo da neon
  dialect: 'postgres',
  port: 5432,  // Porta padrão para PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,  // Exige uma conexão SSL
      rejectUnauthorized: false,  // Necessário para evitar erros de conexão com SSL
    },
  },
});

export default sequelize;