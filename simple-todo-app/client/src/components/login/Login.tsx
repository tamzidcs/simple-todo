import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './login.scss';
const axios = require('axios')
const url = {
    login: 'http://localhost:3005/Login'
}

export const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const login = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (userName && password) {
            axios.post(url.login, { username: userName, password: password })
                .then((resp: { data: { [x: string]: string; }; }) => {
                    console.log(resp.data)
                    if (resp.data['msg'] === 'login success') {
                        localStorage.setItem('username', userName)
                        navigate('/toDoList')
                    }
                    else
                        alert('Wrong username and password.')
                })
        }
    }
    return (
        <div className='login-container'>
            <form onSubmit={login}>
                <label className='userNameLabel'>Username</label>
                <input className='userNameTextField' type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                <label className='passwordLabel'>Password</label>
                <input className='passwordTextField' type='password' onChange={e => setPassword(e.target.value)} />
                <div className='loginButtonDiv'><input className='loginButton' type='submit' value='Login' /></div>
                <div className='loginButtonDiv'><input className='loginButton' type='button' value='Signup' onClick={() => navigate('/signup')} /></div>
            </form>
        </div>
    )
}