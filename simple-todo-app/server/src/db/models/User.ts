import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    ForeignKey,
  } from 'sequelize-typescript';
import TaskUser from './TaskUser';
  import Task from './Task';
  
  @Table({
    timestamps: true,
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
  
    @BelongsToMany(() => Task, () => TaskUser)
    tasks!: Task[];
  }