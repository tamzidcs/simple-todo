import { Todo } from '../db/entity/Todo.js';
import { User } from '../db/entity/User.js';
import * as UserRepo from './userRepo.js';
import { globalConstants } from '../shared/globalConstants.js';
import AppDataSource from '../db/db.js';

export async function createTodo(todo: Todo) {
  return await AppDataSource.manager.save(todo);
}

export async function getTodoById(id: string) {
  const todo = await AppDataSource
    .getRepository(Todo)
    .createQueryBuilder("todo")
    .where("todo.id = :id", { id: id })
    .getOne();

    return todo;
}

export async function getTodoByUsername(username: string) {
    const todo = await AppDataSource
    .getRepository(Todo)
    .createQueryBuilder("todo")
    .where("todo.username = :username", { username: username})
    .getOne();

    return todo;
}

export async function getAllTodosByUsernameStatus(
  username: string,
  todoStatus: string,
) {
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

export async function updateTodoStatusById(todoId: string, todoStatus: string) {
  const updateResponse  = await AppDataSource
  .createQueryBuilder()
  .update(Todo)
  .set({ status: todoStatus })
  .where("id = :id", { id: todoId })
  .execute()

  return updateResponse;
}
