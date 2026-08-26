import { Request, Response, NextFunction } from 'express'
import { Todo } from '../db/entities/Todo.js'
import * as todoService from '../service/todo.service.js';

export async function addNewTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const todo = req.body;

  try {
    const result = await todoService.addNewTodo(todo);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllTodosByUsername(
  req: Request,
  res: Response<Todo[]>,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.params;
    const data = await todoService.getAllTodosByUsername(user.username);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(
  req: Request,
  res: Response<string>,
  next: NextFunction
): Promise<void> {
  const todoId = req.params.todoId;
  const updateFields = req.body;
  try {
    const data = await todoService.updateTodo(todoId,updateFields);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function shareTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newTodoUser = req.body;
  try {
    const result = await todoService.shareTodo(newTodoUser);
    res.send(result);
  } catch (error) {
    next(error);
  }
}