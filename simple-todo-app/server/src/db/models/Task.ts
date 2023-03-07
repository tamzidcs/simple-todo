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
