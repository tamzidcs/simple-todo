"use strict";
// import { DataTypes, Model, Optional } from 'sequelize'
// import sequelize from '../../db'
// import Task from './Task';
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
// interface UserAttributes {
//     id: number;
//     username: string;
//     name?: string;
//     password: string;
// }
// export interface UserInput extends Required<UserAttributes> {}
// export interface UserOutput extends Required<UserAttributes> {}
// export interface GetAllUsersResponse {
//     users: User[];
// }
// export interface RegisterRequest {
//     id: number;
//     username: string;
//     password: string;
// }
// export interface RegisterResponse {
//     id?: number;
//     username?: string;
// }
// export interface LoginRequest {
//     username: string;
//     password: string;
// }
// export interface LoginResponse {
//     username?: string | null;
// }
// class User extends Model<UserAttributes> implements UserAttributes {
//     public id!: number;
//     public username!: string;
//     public password!: string;
//     // timestamps!
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//     public readonly deletedAt!: Date;
// }
// User.init({
//     id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// }, {
//     sequelize: sequelize,
//     paranoid: true
// })
// export default User
const sequelize_typescript_1 = require("sequelize-typescript");
const TaskUser_1 = __importDefault(require("./TaskUser"));
const Task_1 = __importDefault(require("./Task"));
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Task_1.default, () => TaskUser_1.default)
], User.prototype, "tasks", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    })
], User);
exports.default = User;
