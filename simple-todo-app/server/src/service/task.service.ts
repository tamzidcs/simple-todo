import Task, { GetAllTasksResponse } from "../db/models/Task";
import { TaskInput, TaskOutput } from "../db/models/Task";
import User from "../db/models/User";
import TaskUser from "../db/models/TaskUser";
import { where } from "sequelize";

export async function addNewTask(newTask: TaskInput): Promise<TaskOutput> {
  const task = await Task.create(newTask);
  const user = await User.findAll({where: {id: 1}});
  if(user) {
    task.addUser([...user]);
  }
  
  return task;
}

export async function getAllTasks(): Promise<Task[]> {
  const allTasks: Task[] = await Task.findAll();
  return allTasks;
}