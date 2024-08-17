import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey
} from "sequelize-typescript";
import TodoUser from "./TodoUser";
import User from "./User";

@Table({
  timestamps: false,
})
export default class Todo extends Model {
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

  @BelongsToMany(() => User, () => TodoUser)
  users!: User[];
}
