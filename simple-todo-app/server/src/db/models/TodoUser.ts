import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    ForeignKey
  } from 'sequelize-typescript';
  import User from './User';
  import Todo from './Todo';
@Table
export default class TodoUser extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Todo)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  todoId!: number;
}