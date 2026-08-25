import { AppDataSource } from "../db/data-source.js";
import { Todo } from "../db/entities/Todo.js";
import { User } from "../db/entities/User.js";

export async function createUser(user: User) {
  return await AppDataSource.manager.save(user);
}

export async function getUserByUsername(username: string) {
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .select(["user.id", "user.username", "user.password"])
    .where("user.username = :username", { username: username })
    .getOne();

  return user;
}

export async function getAllUser() {
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .getMany();

  return user;
}

export async function createUserTodoRelationship(userId: string, todoId: string) {
  await AppDataSource.createQueryBuilder()
    .relation(User, "todos")
    .of(userId)
    .add(todoId);
}
