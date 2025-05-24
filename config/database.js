import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://neondb_owner:npg_oIaQ7fHWReN9@ep-falling-surf-a8ifwkt0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
