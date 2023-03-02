"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./db/models");
const { Sequelize } = require('sequelize-typescript');
const config = require('./config/config');
const sequelize = new Sequelize("todolist_db", "postgres", "minat123", {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize.addModels([models_1.Task, models_1.User, models_1.TaskUser]);
exports.default = sequelize;
