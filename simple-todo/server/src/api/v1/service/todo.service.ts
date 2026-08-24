import TodoInput from '../interface/todo.js';
import TodoUserInput from '../interface/todoUser.js';
import * as UserRepo from '../repository/userRepo.js';
import * as TodoRepo from '../repository/todoRepo.js';
import { where } from "sequelize";
import { title } from "process";
import { globalConstants } from '../shared/globalConstants.js';
import { NotFoundError } from '../error.js';
import status from "http-status";
import { Todo } from '../db/entity/Todo.js';
import AppDataSource from '../db/db.js';
import { User } from '../db/entity/User.js';

export async function addNewTodo(newTodo: TodoInput): Promise<Todo> {
  const todo = new Todo();
  todo.title = newTodo.title;
  todo.description = newTodo.description;
  todo.dueDate = newTodo.dueDate;
  todo.status = globalConstants.TodoStatusPending;

  const user = await UserRepo.getUserByUsername(newTodo.username);
  if(!user)
    throw new NotFoundError("User not found",status.NOT_FOUND);

  const createdTodo = await TodoRepo.createTodo(todo);

  UserRepo.createUserTodoRelationship(String(user.id),String(createdTodo.id));
  if (createdTodo) {
    return createdTodo;
  } else {
    throw new NotFoundError("Invalid ToDo",status.NOT_FOUND);
  }
}

export async function getAllTodosByUsername(username: string): Promise<Todo[]> {
  const todoStatus = globalConstants.TodoStatusPending;
  const user = await UserRepo.getUserByUsername(username);

  if (user) {
    const todos = await TodoRepo.getAllTodosByUsernameStatus(
      username,
      todoStatus
    );
    if(todos) {
      return todos;
    }
    else {
      throw new NotFoundError("Todos not found", status.NOT_FOUND);
    }
  } else {
    throw new NotFoundError("User not found", status.NOT_FOUND);
  }
}

export async function updateTodo(todoId: string,updateFields: {}): Promise<string> {
  const todo = await TodoRepo.getTodoById(todoId);
  if(todo) {
    const affectedRows = await TodoRepo.updateTodoById(todoId,updateFields);
    if (affectedRows.affected === 0) {
      throw new Error("status update failed.");
    }
    return todoId;
  }
  else {
    throw new NotFoundError("ToDo not found", status.NOT_FOUND); 
  }
}

export async function shareTodo(newTodoUser: TodoUserInput): Promise<User> {
  const user = await UserRepo.getUserByUsername(newTodoUser.username);
  if(user) {
    const shareTodoQuery = await AppDataSource
    .createQueryBuilder()
    .relation(Todo, "users")
    .of(newTodoUser.todoId)

    shareTodoQuery.add(user.id);
    return user;
  }
  else {
    throw new NotFoundError("User not found", status.NOT_FOUND);
  }
}
