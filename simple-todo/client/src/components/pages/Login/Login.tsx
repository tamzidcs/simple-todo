import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../../api/users';
import { user } from '../../../interfaces/user';
import './Login.scss';

const User: user = {
  username: '',
  password: '',
};

export function Login() {
  const [loginUser, setLoginUser] = useState<user>(User);
  const navigate = useNavigate();
  const login = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (loginUser.username && loginUser.password) {
      try {
        const result = await postLogin(loginUser);
        if (result) {
          localStorage.setItem('username', loginUser.username);
          navigate('/toDoList');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <div className="login-header" data-testid="login-header">
          Login
        </div>
        <label className="login-label" htmlFor="username-textfield">
          Username
          <input
            id="username-textfield"
            className="login-textfield"
            data-testid="username-textfield"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setLoginUser({ ...loginUser, username: e.target.value })}
          />
        </label>
        <label className="login-label" htmlFor="password-textfield">
          Password
          <input
            id="password-textfield"
            className="login-textfield"
            data-testid="password-textfield"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginUser({ ...loginUser, password: e.target.value })}
          />
        </label>
        <div className="login-button-div">
          <button
            className="login-button"
            data-testid="login-button"
            type="submit"
            value="Login"
          >
            Login
          </button>
        </div>
        <div className="login-button-div">
          <button
            className="login-button"
            type="button"
            value="Signup"
            onClick={() => navigate('/signup')}
          >
            Signout
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
