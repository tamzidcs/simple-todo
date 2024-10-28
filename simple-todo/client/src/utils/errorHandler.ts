import { AxiosError } from 'axios';

export const handleError = (error: AxiosError) => {
  if (error.response?.status === 403) {
    alert('Wrong username and/or password.');
  }
  if (error.response?.status === 409) {
    alert('User already exists.');
  } else if (error.message === 'Network Error') {
    alert('Server unreachable.');
  }
};
export default handleError;
