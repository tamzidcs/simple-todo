import { Task, TaskUser, User } from "./db/models";

const { Sequelize } = require('sequelize-typescript');
const config = require('./config/config');

const sequelize = new Sequelize("todolist_db","postgres", "minat123", {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize.addModels([Task,User,TaskUser]);
export default sequelize;