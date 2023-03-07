import { AxiosError } from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './login.scss';
const axios = require('axios')
const url = {
    login: 'http://localhost:3005/login'
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
                    if (resp.data['username']) {
                        localStorage.setItem('username', userName)
                        navigate('/toDoList')
                    }
                    else
                        alert('Wrong username and password.')
                }).catch((error: AxiosError)=>{
                    if(error.response?.status === 401) {
                        alert('Wrong username and/or password.')
                    }
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