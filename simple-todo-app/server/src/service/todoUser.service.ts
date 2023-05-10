import Todo from "../db/models/Todo";
import User from "../db/models/User";
import TodoUser from "../db/models/TodoUser";
import TodoInput from '../interface/todo';
import { where } from "sequelize";
import TodoUserInput from "../interface/todoUser";

export async function addNewTodoUser(
  todoId: number,
  userId: number
): Promise<TodoUser> {
  const todoUser = new TodoUser();
  todoUser.userId = todoId;
  todoUser.todoId = userId;
  await todoUser.save();
  return todoUser;
}