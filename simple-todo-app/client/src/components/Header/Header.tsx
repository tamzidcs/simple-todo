import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

export const  Header = () => {
    const navigate = useNavigate();
    const signout = () => {
        localStorage.setItem('username','')
        navigate('/login')
    }
    
    return(
        <div className='header-container'>
            <div className='username-container'>{localStorage.getItem('username')}</div>
            <div className='signout-button-container'><button onClick={signout}>Signout</button></div>
        </div>
    );
};
export default Header;