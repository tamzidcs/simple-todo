import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

export function Header() {
  const currentUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const signout = () => {
    localStorage.setItem('username', '');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="username-container">
        {currentUsername}
      </div>
      <div className="signout-button-container">
        <button type="button" onClick={signout}>Signout</button>
      </div>
    </div>
  );
}
export default Header;
