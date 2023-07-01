import { AxiosError } from "axios";

export const handleError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    alert("Wrong username and/or password.");
  } else if (error.message === "Network Error") {
    alert("Server unreachable.");
  }
};
