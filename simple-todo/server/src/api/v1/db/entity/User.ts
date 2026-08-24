import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Todo } from './Todo.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type:"varchar"})
  username!: string;

  @Column({ type: "varchar", length: 255, select: false })
  password!: string;

  @ManyToMany(() => Todo,(todo) => todo.users)
  @JoinTable()
  todos: Todo[]
}
