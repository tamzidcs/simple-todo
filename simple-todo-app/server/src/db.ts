import { Task, TaskUser, User } from "./db/models";

const { Sequelize } = require('sequelize-typescript');
const config = require('./config/config');
const sequelizeConf = {
    database: "todolist_db",
    user: "postgres",
    password: "minat123",
    host: 'localhost',
    dialect: 'postgres'
}


const sequelize = new Sequelize(sequelizeConf.database,sequelizeConf.user,sequelizeConf.password , {
    host: sequelizeConf.host,
    dialect: sequelizeConf.dialect
});
sequelize.addModels([Task,User,TaskUser]);
export default sequelize;