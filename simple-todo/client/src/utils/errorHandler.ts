import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    toast.error('Wrong username and/or password.');
  }
  if (error.response?.status === 409) {
    toast.error('User already exists.');
  } else if (error.message === 'Network Error') {
    toast.error('Server unreachable.');
  }
};
export default handleError;
