const { Sequelize } = require('sequelize');
const config = require('./config/db.config');

const sequelize = new Sequelize(config.DB.database, config.DB.user, config.DB.password, {
    host: 'localhost',
    dialect: 'postgres'
});