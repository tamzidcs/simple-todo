import Todo from "../db/models/Todo";
import User from "../db/models/User";
import TodoUser from "../db/models/TodoUser";
import TodoInput from "../interface/todo";
import TodoUserInput from "../interface/todoUser";
import * as UserRepo from "../repository/userRepo";
import * as TodoRepo from "../repository/todoRepo";
import * as TodoUserRepo from "../repository/todoUserRepo";
import { where } from "sequelize";
import { title } from "process";
import { globalConstants } from "../shared/globalConstants";
import { NotFoundError } from "../error";
import { NOT_FOUND } from "http-status";

export async function addNewTodo(newTodo: TodoInput): Promise<Todo> {
  const todo = new Todo({
    title: newTodo.title,
    description: newTodo.description,
    status: globalConstants.TodoStatusPending,
  });

  const createdTodo = await TodoRepo.createTodo(todo);
  if (createdTodo) {
    const user = await TodoRepo.getTodoByUsername(newTodo.username);
    if (user) {
      const todoUser = new TodoUser({
        userId: user?.id,
        todoId: todo.id,
      });
      TodoUserRepo.createTodoUser(todoUser);
    } else {
      throw new NotFoundError("User not found",NOT_FOUND);
    }
  } else {
    throw new NotFoundError("Invalid ToDo",NOT_FOUND);
  }
  return todo;
}

export async function getAllTodosByUsername(username: string): Promise<Todo[]> {
  const todoStatus = globalConstants.TodoStatusPending;
  const user = await UserRepo.getUserByUsername(username);
  if (user) {
    const todos = await TodoRepo.getAllTodosByUsernameStatus(
      username,
      todoStatus
    );
    return todos;
  } else {
    throw new NotFoundError("User not found", NOT_FOUND);
  }
}

export async function updateTodoStatus(todoId: string): Promise<string> {
  const todo = await TodoRepo.getTodoById(todoId);
  if(todo) {
    const affectedRows = await TodoRepo.updateTodoStatusById(todoId,globalConstants.TodoStatusDone);
    if (affectedRows[0] === 0) {
      throw new Error("status update failed.");
    }
    return todoId;
  }
  else {
    throw new NotFoundError("ToDo not found", NOT_FOUND); 
  }
}

export async function shareTodo(newTodoUser: TodoUserInput): Promise<TodoUser> {
  const todoUser = new TodoUser();
  const user = await UserRepo.getUserByUsername(newTodoUser.username);
  if(user) {
    todoUser.userId = user?.id;
    todoUser.todoId = newTodoUser.todoId;
    const todoUserFound = await TodoUserRepo.getTodoUserByTodoIdUserId(todoUser.userId,todoUser.todoId);
    if (!todoUserFound) {
      await TodoUserRepo.createTodoUser(todoUser);
      return todoUser;
    }
    return todoUserFound;
  }
  else {
    throw new NotFoundError("User not found", NOT_FOUND);
  }
}
