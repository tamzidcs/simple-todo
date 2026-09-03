import axios, { AxiosError } from 'axios';
import { todo } from '../interfaces/todo';
import { handleError } from '../utils/errorHandler';
import URL from '../shared/constants';

export async function postTodo(newTodo: todo): Promise<todo> {
  return axios
    .post(URL.todos, newTodo)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function getTodo(username: string): Promise<todo[]> {
  return axios
    .get(URL.todos + username)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function updateTodo(todoId: string, updateFields:{}): Promise<todo> {
  return axios
    .patch(URL.todos + todoId, updateFields)
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
    .post(URL.share, { todoId, username })
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}
