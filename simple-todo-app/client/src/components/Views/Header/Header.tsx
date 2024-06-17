import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import Button from '../Button/Button';

export function Header() {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.setItem('username', '');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="username-container">
        {localStorage.getItem('username')}
      </div>
      <div className="signout-button-container">
        <Button
          className="signout-button"
          testId="signup-button"
          text="Signout"
          type="button"
          onClick={signout}
        />
      </div>
    </div>
  );
}
export default Header;
