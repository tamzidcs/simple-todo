import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../../api/users';
import { user } from '../../../interfaces/user';
import './Login.scss';
import Button from '../../Views/Button/Button';

const User: user = {
  username: '',
  password: '',
};

export function Login() {
  const [data, setData] = useState<user>(User);
  const navigate = useNavigate();
  const login = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (data.username && data.password) {
      try {
        const result = await postLogin(data);
        if (result) {
          localStorage.setItem('username', data.username);
          navigate('/toDoList');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="simple-todo-logo">Simple Todo</div>
      <form className="login-form" onSubmit={login}>
        <div className="login-header" aria-valuetext="login">
          Login
        </div>
        <label className="login-label" htmlFor="username">
          Username
          <input
            id="username"
            className="login-textfield"
            type="text"
            placeholder="Username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </label>
        <label className="login-label" htmlFor="password">
          Password
          <input
            id="password"
            className="login-textfield"
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </label>
        <div className="login-button-div">
          <Button
            className="login-button"
            testId="login-button"
            text="Login"
            type="submit"
          />
        </div>
        <div className="login-button-div">
          <Button
            className="login-button"
            testId="signup-button"
            text="Signup"
            type="button"
            onClick={() => navigate('/signup')}
          />
        </div>
      </form>
    </div>
  );
}
export default Login;
