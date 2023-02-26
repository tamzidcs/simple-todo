import Task, { GetAllTasksResponse } from "../db/models/Task";
import { TaskInput, TaskOutput } from "../db/models/Task";

export async function addNewTask(newTask: TaskInput): Promise<TaskOutput> {
  const task = await Task.create(newTask);
  return task;
}

export async function getAllTasks(): Promise<Task[]> {
  const allTasks: Task[] = await Task.findAll();
  return allTasks;
}
