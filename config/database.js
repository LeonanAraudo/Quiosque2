import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('quiosque2_postgres', 'quiosque2_postgres_user', 'TpIL2mEMR5XUiEGl8G9fVkQERNcNvklg', {
  host: 'dpg-d04g2lruibrs73b2h010-a.oregon-postgres.render.com',  // Host completo do Render
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
