import axios, { AxiosError } from "axios";
import { todo } from "../interfaces/todo";

const url = {
  addTodo: "http://localhost:3005/todos",
};

export default async function addNewTodo(newTodo: todo): Promise<todo> {
  return axios
        .post(url.addTodo, newTodo)
        .then((resp: { data: any; }) => {
            return resp.data;
        })
        .catch((error: AxiosError) => {
            return error;
        });
}
