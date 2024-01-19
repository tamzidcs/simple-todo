import axios, { AxiosError } from 'axios';
import { todo } from '../interfaces/todo';
import { handleError } from '../utils/errorHandler';

const url = {
  todo: 'http://localhost:3005/todos/',
  share: 'http://localhost:3005/share/',
};

export async function postTodo(newTodo: todo): Promise<todo> {
  return axios
    .post(url.todo, newTodo)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function getTodo(username: string): Promise<todo[]> {
  return axios
    .get(url.todo + username)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function updateTodoDone(todoId: string): Promise<todo> {
  return axios
    .patch(url.todo + todoId)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function postTodoShare(
  todoId: string,
  username: string,
): Promise<todo> {
  return axios
    .post(url.share, { todoId, username })
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}
