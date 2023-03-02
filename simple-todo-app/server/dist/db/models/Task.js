"use strict";
// import { BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, DataTypes, Model, Optional } from 'sequelize'
// import sequelize from '../../db'
// import User from './User';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// interface TaskAttributes {
//     id: number;
//     title: string;
//     description?: string;
//     status?: string;
// }
// export interface TaskInput extends Required<TaskAttributes> {}
// export interface TaskOutput extends Required<TaskAttributes> {}
// export interface GetAllTasksResponse {
//     tasks: Task[];
// }
// class Task extends Model<TaskAttributes> implements TaskAttributes {
//     declare addUser: BelongsToManyAddAssociationsMixin<User,number>;
//     public id!: number;
//     public title!: string;
//     public description!: string;
//     public status!: string;
//     // timestamps!
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//     public readonly deletedAt!: Date;
// }
// Task.init({
//     id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     title: {
//         type: DataTypes.STRING
//     }
// }, {
//     sequelize: sequelize,
//     paranoid: true
// })
// export default Task
const sequelize_typescript_1 = require("sequelize-typescript");
const TaskUser_1 = __importDefault(require("./TaskUser"));
const User_1 = __importDefault(require("./User"));
let Task = class Task extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Task.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Task.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Task.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => TaskUser_1.default)
], Task.prototype, "users", void 0);
Task = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    })
], Task);
exports.default = Task;
