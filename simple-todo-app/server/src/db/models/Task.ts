// import { BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, DataTypes, Model, Optional } from 'sequelize'
// import sequelize from '../../db'
// import User from './User';

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

import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey
} from "sequelize-typescript";
import TaskUser from "./TaskUser";
import User from "./User";

@Table({
  timestamps: true,
})
export default class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @BelongsToMany(() => User, () => TaskUser)
  users!: User[];
}
