import { Request, Response, NextFunction } from 'express';
import Task from '../db/models/Task';
import * as taskService from '../service/task.service';

export async function addNewTask(
  req: Request,
  res: Response,
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
    const user = req.params;
    console.log("user:", user);
    const data = await taskService.getAllTasks(user.username);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}