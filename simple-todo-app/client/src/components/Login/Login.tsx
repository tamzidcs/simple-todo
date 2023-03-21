import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../api/users';
import { user } from '../../interfaces/user';
import './Login.scss';

const User: user = {
    username: '',
    password: ''
};

export const Login = () => {
    const [data,setData] = useState<user>(User);
    const navigate = useNavigate();
    const login = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (data.username && data.password) {
            const result = await postLogin(User);
            if (result) {
                localStorage.setItem('username', data.username);
                navigate('/toDoList');
            }
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={login}>
                <label className='userNameLabel'>Username</label>
                <input className='userNameTextField' type='text' onChange={e => setData({...data,username:e.target.value})} />
                <label className='passwordLabel'>Password</label>
                <input className='passwordTextField' type='password' onChange={e => setData({...data,password:e.target.value})} />
                <div className='loginButtonDiv'><input className='loginButton' type='submit' value='Login' /></div>
                <div className='loginButtonDiv'><input className='loginButton' type='button' value='Signup' onClick={() => navigate('/signup')} /></div>
            </form>
        </div>
    )
}