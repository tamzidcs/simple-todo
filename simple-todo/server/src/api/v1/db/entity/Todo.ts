import { Entity,PrimaryGeneratedColumn,Column, ManyToMany, JoinTable } from "typeorm";
import { OneToMany } from "typeorm/browser";
import { User } from './User.js';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar"})
    title!: string;

    @Column({type:"varchar"})
    description!: string;

    @Column({type:"varchar"})
    status!: string;

    @Column({type:"varchar"})
    dueDate!: string;

    @ManyToMany(() => User, (user) => user.todos)
    users: User[] | undefined;
}
