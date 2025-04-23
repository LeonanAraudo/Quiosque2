import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'quiosque2_postgres', // nome do banco
  'quiosque2_postgres_user', // usuário
  'TpIL2mEMR5XUiEGl8G9fVkQERNcNvklg', // senha
  {
    host: 'dpg-d04g2lruibrs73b2h010-a.oregon-postgres.render.com', // tente com esse domínio completo
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necessário para o SSL funcionar no Render
      },
    },
  }
);

export default sequelize;
