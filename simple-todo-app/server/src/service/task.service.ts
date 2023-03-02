import Task from "../db/models/Task";
import User from "../db/models/User";
import TaskUser from "../db/models/TaskUser";
import TaskInput from '../interface/task';
import { where } from "sequelize";

export async function addNewTask(newTask: TaskInput): Promise<Task> {
  const task = new Task();
  task.title = newTask.title;
  task.description =newTask.description;
  task.status = newTask.status;
  await task.save();
  
  const taskUser = new TaskUser();
  taskUser.userId = newTask.userId;
  taskUser.taskId = task.id;
  await taskUser.save();

  return task;
}

export async function getAllTasks(username: string): Promise<Task[]> {
  const user = await User.findOne({where: {username: username}})
  const allTaskUser = await TaskUser.findAll({where:{userId: user?.id}})
  const tasks = await Task.findAll({where:{id: allTaskUser.map((allTaskUser)=>{return allTaskUser.taskId})}});
  return tasks;
}