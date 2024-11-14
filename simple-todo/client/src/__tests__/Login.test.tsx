import {
  fireEvent,
  getByText,
  render, screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import Login from '../components/pages/Login/Login';
import { postLogin } from '../api/users';

const mockedUsedNavigate = jest.fn();
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const loginUser = {
  username: 'test_user',
  password: 'L£mX)970K.bA',
};

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });
  describe('when login button is clicked', () => {
    let loginButton: HTMLInputElement;
    let usernameTextField: HTMLInputElement;
    let passwordTextField: HTMLInputElement;
    beforeEach(async () => {
      loginButton = screen.getByTestId('login-button') as HTMLInputElement;
      usernameTextField = screen.getByTestId(
        'username-textfield',
      ) as HTMLInputElement;
      passwordTextField = screen.getByTestId(
        'password-textfield',
      ) as HTMLInputElement;
      window.alert = () => {};
      (axios.post as jest.Mock).mockResolvedValue({ data: loginUser });
      await waitFor(() =>
        fireEvent.change(usernameTextField, {
          target: { value: loginUser.username },
        }));
      await waitFor(() =>
        fireEvent.change(passwordTextField, {
          target: { value: loginUser.password },
        }));
      await waitFor(() => fireEvent.click(loginButton));
    });
    it('username textfield has the correct value', async () => {
      expect(usernameTextField.value).toBe(loginUser.username);
    });
    it('password textfield has the correct value', async () => {
      expect(passwordTextField.value).toBe(loginUser.password);
    });
    it('password textfield has the correct value', async () => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
