import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    ForeignKey
  } from 'sequelize-typescript';
  import User from './User';
  import Task from './Task';
@Table
export default class TaskUser extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taskId!: number;
}