import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.scss';
import Button from '../Button/Button';
import simpleTodoTopbarLogo from '../../../resources/assets/simple-todo-topbar-logo.png';

export function Header() {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.setItem('username', '');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="topbar-left">
        <img src={simpleTodoTopbarLogo} alt="simple-todo-topbar-logo" />
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
