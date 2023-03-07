import Task from "../db/models/Task";
import User from "../db/models/User";
import TaskUser from "../db/models/TaskUser";
import TaskInput from '../interface/task';
import { where } from "sequelize";
import TaskUserInput from "../interface/taskUser";

export async function addNewTaskUser(taskId: number, userId: number): Promise<TaskUser> {
  const taskUser = new TaskUser();
  taskUser.userId = taskId;
  taskUser.taskId = userId;
  await taskUser.save();
  return taskUser;
}