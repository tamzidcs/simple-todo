import  { Todo }  from "../db/entities/Todo.js";
import  { User }  from "../db/entities/User.js";
import * as UserRepo from "../repository/userRepo.js";
import { globalConstants } from "../shared/globalConstants.js";
import { AppDataSource } from "../db/data-source.js";

export async function createTodo(todo: Todo) {
  return await AppDataSource.manager.save(todo);
}

export async function getTodoByUsername(username: string) {
    const todo = await AppDataSource
    .getRepository(Todo)
    .createQueryBuilder("todo")
    .where("todo.username = :username", { username: username})
    .getOne();

    return todo;
}

export async function getTodoById(id: string) {
  const todo = await AppDataSource
    .getRepository(Todo)
    .createQueryBuilder("todo")
    .where("todo.id = :id", { id: id })
    .getOne();

    return todo;
}

export async function getAllTodosByUsernameStatus(username: string,todoStatus: string) {
 const user = await UserRepo.getUserByUsername(username);
  const userId =user?.id;
  const todoByUsername = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.todos", "todo")
    .where("user.id = :id", {id: userId})
    .andWhere("todo.status = :status", {status: todoStatus})
    .getOne()

  return todoByUsername?.todos;
}

export async function updateTodoStatusById(todoId: string, updateFields: {}) {
  const updateResponse  = await AppDataSource
  .createQueryBuilder()
  .update(Todo)
  .set(updateFields)
  .where("id = :id", { id: todoId })
  .execute()

  return updateResponse;
}

export async function updateTodoById(todoId: string, updateFields: {}) {
  const updateResponse  = await AppDataSource
  .createQueryBuilder()
  .update(Todo)
  .set(updateFields)
  .where("id = :id", { id: todoId })
  .execute()

  return updateResponse;
}
