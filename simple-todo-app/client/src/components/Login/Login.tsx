import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../api/users';
import { user } from '../../interfaces/user';
import './Login.scss';

let User: user = {
    username: '',
    password: ''
};

export const Login = () => {
    const [data,setData] = useState<user>(User);
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
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={login}>
                <div className='login-header'>Login</div>
                <label className='login-label'>Username</label>
                <input className='login-textfield' type='text' placeholder="Username" onChange={e => setData({...data,username:e.target.value})} />
                <label className='login-label'>Password</label>
                <input className='login-textfield' type='password' placeholder="Password" onChange={e => setData({...data,password:e.target.value})} />
                <div className='login-button-div'><input className='login-button' type='submit' value='Login' /></div>
                <div className='login-button-div'><input className='login-button' type='button' value='Signup' onClick={() => navigate('/signup')} /></div>
            </form>
        </div>
    )
}
export default Login;