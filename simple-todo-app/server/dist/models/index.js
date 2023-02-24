"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Task_1 = __importDefault(require("./entities/Task"));
const User_1 = __importDefault(require("./entities/User"));
class Models {
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    initModels() {
        this.sequelize.addModels(this.getModels());
    }
    getModels() {
        return [
            Task_1.default, User_1.default
        ];
    }
}
exports.Models = Models;
