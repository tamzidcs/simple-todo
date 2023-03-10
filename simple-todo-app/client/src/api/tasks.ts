import axios, { AxiosError } from "axios";
import { task } from "../interfaces/task";

const url = {
  addTask: "http://localhost:3005/tasks",
};

export default async function addNewTask(newTask: task): Promise<task> {
  return axios
        .post(url.addTask, newTask)
        .then((resp: { data: any; }) => {
            return resp.data;
        })
        .catch((error: AxiosError) => {
            return error;
        });
}
