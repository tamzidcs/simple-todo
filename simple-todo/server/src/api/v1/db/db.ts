import { Todo, TodoUser, User } from "./models";
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const { Sequelize } = require("sequelize-typescript");

const sequelizeConf = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
};

const sequelize = new Sequelize({
  database: sequelizeConf.database,
  username: sequelizeConf.username,
  password: sequelizeConf.password,
  host: sequelizeConf.host,
  dialect: sequelizeConf.dialect,
  logging: sequelizeConf.logging,
  models: [User, Todo, TodoUser],
});

sequelize.addModels([Todo, User, TodoUser]);

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
export default sequelize;