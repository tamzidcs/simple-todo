import * as dotenv from 'dotenv';
dotenv.config();
import { Todo, TodoUser, User } from "./db/models";

const { Sequelize } = require('sequelize-typescript');
const config = require('./config/config');
const sequelizeConf = {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    host:  process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
}
debugger;
const sequelize = new Sequelize(sequelizeConf.database,sequelizeConf.user,sequelizeConf.password , {
    host: sequelizeConf.host,
    dialect: sequelizeConf.dialect,
    logging: sequelizeConf.logging
});
sequelize.addModels([Todo,User,TodoUser]);
export default sequelize;