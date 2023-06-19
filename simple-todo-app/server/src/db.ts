import * as dotenv from "dotenv";
dotenv.config();
import { Todo, TodoUser, User } from "./db/models";

const { Sequelize } = require("sequelize-typescript");
const config = require("./config/config");
const sequelizeConf = {
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
};

const sequelize = new Sequelize({
  database: sequelizeConf.database,
  username: sequelizeConf.user,
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
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
