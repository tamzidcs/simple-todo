import { DataTypes } from "sequelize";
import {
  Column,
  DataType,
  Table
} from "sequelize-typescript";
import sequelize from "sequelize/types/sequelize";
import Base, { BaseEntity } from "./Base";

interface UserEntity extends BaseEntity {}

@Table({ tableName: "tasks", paranoid: true })
class Task extends Base {
  @Column({ type:DataType.STRING("100"), allowNull: false })
  title!: string;

  @Column({ type:DataType.STRING("100"),allowNull: false })
  description?: string;

  @Column({ type:DataType.STRING("100"), allowNull: false })
  status?: string;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {type: DataType.STRING("100")},
    description: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING }
  },
  {
    sequelize,
    tableName: 'tasks',
  },
);
export default Task;
