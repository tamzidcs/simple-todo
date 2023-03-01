import { Request, Response, NextFunction } from 'express';
import Task, { TaskInput, TaskOutput } from '../db/models/Task';
import * as taskService from '../service/task.service';

export async function addNewTask(
  req: Request<unknown, unknown, TaskInput, unknown>,
  res: Response<TaskOutput>,
  next: NextFunction
): Promise<void> {
  const task = req.body;

  try {
    const result = await taskService.addNewTask(task);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTasks(
  req: Request,
  res: Response<Task[]>,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskService.getAllTasks();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}