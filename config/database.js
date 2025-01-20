import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'ol65p4t5', {
  host: 'localhost',
  dialect: 'postgres', 
});

export default sequelize;
