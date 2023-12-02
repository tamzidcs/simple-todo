"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const models_1 = require("./db/models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
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
    models: [models_1.User, models_1.Todo, models_1.TodoUser],
});
sequelize.addModels([models_1.Todo, models_1.User, models_1.TodoUser]);
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
exports.initializeDatabase = initializeDatabase;
exports.default = sequelize;
