import axios, { AxiosError } from "axios";
import { user } from "../interfaces/user";
const url = {
  user: "http://localhost:3005/users/",
  login: 'http://localhost:3005/login'
};

export async function postUser(newUser: user): Promise<user> {
  return axios
    .post(url.user, newUser)
    .then((resp: { data: any }) => {
      return resp.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
}

export async function postLogin(User: user): Promise<user> {
  return axios
    .post(url.login, { username: User.username, password: User.password })
    .then((resp: { data: any }) => {
      return resp.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        alert("Wrong username and/or password.");
      }
    });
}
