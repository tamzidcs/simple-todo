import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    ForeignKey,
  } from 'sequelize-typescript';
import TodoUser from './TodoUser';
  import Todo from './Todo';
  
  @Table({
    timestamps: false,
  })
  export default class User extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    username!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;
  
    @BelongsToMany(() => Todo, () => TodoUser)
    todos!: Todo[];
  }