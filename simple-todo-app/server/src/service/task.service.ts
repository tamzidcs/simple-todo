import Task from "../db/models/Task";
import User from "../db/models/User";
import TaskUser from "../db/models/TaskUser";
import TaskInput from '../interface/task';
import TaskUserInput from '../interface/taskUser';
import { where } from "sequelize";

export async function addNewTask(newTask: TaskInput): Promise<Task> {
  const task = new Task();
  task.title = newTask.title;
  task.description = newTask.description;
  task.status = "pending";
  await task.save();
  
  const taskUser = new TaskUser();
  const user =  await User.findOne({where: {username: newTask.username}})
  taskUser.userId = user?.id;
  taskUser.taskId = task.id;
  await taskUser.save();

  return task;
}

export async function getAllTasks(username: string): Promise<Task[]> {
  const user = await User.findOne({where: {username: username}})
  const allTaskUser = await TaskUser.findAll({where:{userId: user?.id}})
  const tasks = await Task.findAll({where:{id: allTaskUser.map((allTaskUser)=>{return allTaskUser.taskId}), status: 'pending'}});
  return tasks;
}

export async function updateTaskStatus(taskId: string): Promise<string> {
  const affectedRows = await Task.update({status:'done'},{where:{id: taskId}})
  if(affectedRows[0] === 0) {
    throw new Error('status update failed.');
  }
  return taskId;
}

export async function shareTask(newTaskUser: TaskUserInput): Promise<TaskUser> {
  const taskUser = new TaskUser();
  const user =  await User.findOne({where: {username: newTaskUser.username}})
  taskUser.userId = user?.id;
  taskUser.taskId = newTaskUser.taskId;
  const taskUserFound =  await TaskUser.findOne({where: {userId: taskUser.userId, taskId: taskUser.taskId}})
  if(!taskUserFound) {
    await taskUser.save();
    return taskUser;
  }
  return taskUserFound;
}