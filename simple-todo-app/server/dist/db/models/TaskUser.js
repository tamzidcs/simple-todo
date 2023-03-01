"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const Task_1 = __importDefault(require("./Task"));
const User_1 = __importDefault(require("./User"));
class TaskUser extends sequelize_1.Model {
}
TaskUser.init({
    TaskId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Task_1.default,
            key: 'id'
        }
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: User_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: db_1.default,
    paranoid: true
});
Task_1.default.belongsToMany(User_1.default, { through: 'TaskUser', uniqueKey: 'TaskId' });
User_1.default.belongsToMany(Task_1.default, { through: 'TaskUser', uniqueKey: 'UserId' });
exports.default = TaskUser;
