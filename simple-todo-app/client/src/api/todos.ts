import axios, { AxiosError } from "axios";
import { todo } from "../interfaces/todo";

const url = {
  todo: 'http://localhost:3005/todos/',
  share: 'http://localhost:3005/share/',
}

export async function postTodo(newTodo: todo): Promise<todo> {
  return axios
    .post(url.todo, newTodo)
    .then((resp) => {
      return resp.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
}

export  async function updateTodoDone(todoId: string): Promise<todo> {
  return axios
    .patch(url.todo + todoId)
    .then((resp) => {
      return resp.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
}

export  async function postTodoShare(todoId: string, username: string): Promise<todo> {
  return axios
    .post(url.share, { todoId: todoId, username: username })
    .then((resp) => {
      if (resp.data) {
        return resp.data;
      }
    }).catch((error: AxiosError) => {
      return error;
    });
}
