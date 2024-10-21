import axios, { AxiosError } from 'axios';
import { user } from '../interfaces/user';
import { handleError } from '../utils/errorHandler';

const url = {
  user: 'http://localhost:3005/v1/users/',
  login: 'http://localhost:3005/v1/login',
};

export async function postUser(newUser: user): Promise<user> {
  return axios
    .post(url.user, newUser)
    .then((resp: { data: any }) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function postLogin(User: user): Promise<user> {
  return axios
    .post(url.login, { username: User.username, password: User.password })
    .then((resp: { data: any }) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}
