import { Todo } from '../db/entity/Todo.js';
import { User } from '../db/entity/User.js';
import * as UserRepo from './userRepo.js';
import { globalConstants } from '../shared/globalConstants.js';
import AppDataSource from '../db/db.js';

export function createTodo(todo: Todo) {
  return AppDataSource.manager.save(todo);
}

export async function getTodoById(id: string) {
  const todo = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id })
    .getOne();

    return todo;
}

export async function getTodoByUsername(username: string) {
    const todo = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username: username})
    .getOne();

    return todo;
}

export async function getAllTodosByUsernameStatus(
  username: string,
  todoStatus: string,
) {
  const user = await UserRepo.getUserByUsername(username);
  const todoByUsername = await AppDataSource
    .getRepository(Todo)
    .createQueryBuilder("todo")
    .leftJoinAndSelect("todo.users", "user")
    .getMany()

  return todoByUsername;
}

export async function updateTodoStatusById(todoId: string, todoStatus: string) {
  const updateResponse  = await AppDataSource
  .createQueryBuilder()
  .update(Todo)
  .set({ status: globalConstants.TodoStatusDone })
  .where("id = :id", { id: todoId })
  .execute()

  return updateResponse;
}
