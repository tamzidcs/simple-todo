import { AllowNull,Table, Column, DataType, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    username!: string;

    @Column
    password!: string;

    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
}