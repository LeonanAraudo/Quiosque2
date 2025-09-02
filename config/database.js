import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres",   // nome do banco
  "postgres",   // usuário
  "ol65p4t5",       // senha
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  }
);

export default sequelize;
