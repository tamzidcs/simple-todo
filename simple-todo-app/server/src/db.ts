import { Todo, TodoUser, User } from "./db/models";

const { Sequelize } = require('sequelize-typescript');
const config = require('./config/config');
const sequelizeConf = {
    database: "todolist_db",
    user: "postgres",
    password: "minat123",
    host: 'localhost',
    dialect: 'postgres',
    logging: false
}


const sequelize = new Sequelize(sequelizeConf.database,sequelizeConf.user,sequelizeConf.password , {
    host: sequelizeConf.host,
    dialect: sequelizeConf.dialect,
    logging: sequelizeConf.logging
});
sequelize.addModels([Todo,User,TodoUser]);
export default sequelize;