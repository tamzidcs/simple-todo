import axios, { AxiosError } from 'axios';
import { user } from '../interfaces/user';
import { handleError } from '../utils/errorHandler';
import URL from '../shared/constants';

export async function postUser(newUser: user): Promise<user | void> {
  return axios
    .post(URL.users, newUser)
    .then((resp: { data: user }) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}

export async function postLogin(User: user): Promise<user | void> {
  return axios
    .post(URL.login, { username: User.username, password: User.password })
    .then((resp: { data: user }) => resp.data)
    .catch((error: AxiosError) => {
      handleError(error);
    });
}
