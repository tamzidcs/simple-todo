"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const sequelize = new Sequelize("todolist_db", "postgres", "minat123", {
    host: 'localhost',
    dialect: 'postgres'
});
exports.default = sequelize;
