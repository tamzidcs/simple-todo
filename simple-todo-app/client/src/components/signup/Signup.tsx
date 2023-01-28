import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require('axios')
const url = {
    addUser: 'http://localhost:3005/Users'
}

export const Signup = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
     
    const addUser = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (userName && password) {
            axios.post(url.addUser, { username: userName, password: password })
                .then((resp: { data: any; }) => {
                    console.log(resp.data)
                    alert('signup complete.')
                    navigate('/login')
                })
        }
    }

    return (
        <div className='signup-container'>
            <form onSubmit={addUser}>
                <label className='userNameLabel'>Username</label>
                <input className='userNameTextField' type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                <label className='passwordLabel'>Password</label>
                <input className='passwordTextField' type='password' onChange={e => setPassword(e.target.value)} />
                <div className='signupButtonDiv'><input className='signupButton' type='submit' value='Signup' /></div>
            </form>
        </div>
    )
}
