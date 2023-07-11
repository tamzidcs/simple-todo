import { Todo, TodoUser, User } from "./db/models";
import Config  from "./db/config/config";

const { Sequelize } = require("sequelize-typescript");

const sequelizeConf = {
  database: Config.database,
  user: Config.username,
  password: Config.password,
  host: Config.host,
  dialect: Config.dialect,
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
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
