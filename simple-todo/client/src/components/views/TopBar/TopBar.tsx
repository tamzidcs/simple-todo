import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.scss';
import Button from '../Button/Button';
import simpleTodoLogo from '../../../resources/assets/simple-todo-logo.png';

export function Header() {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.setItem('username', '');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="topbar-left">
        <div className="topbar-simple-todo-logo">
          <img src={simpleTodoLogo} alt="simple-todo-logo" />
          <div className="topbar-simple-todo-logo-text">Simple ToDo</div>
        </div>
      </div>
      <div className="topbar-center"> </div>

      <div className="topbar-right">
        <div className="username-container">
          {localStorage.getItem('username')}
        </div>
        <Button
          className="button signout-button"
          testId="signout-button"
          text="Signout"
          type="button"
          onClick={signout}
        />
      </div>
    </div>
  );
}
export default Header;
