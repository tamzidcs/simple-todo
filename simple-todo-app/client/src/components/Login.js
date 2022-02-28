import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const axios = require('axios')

export function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault()
        if (userName && password) {
            axios.post('http://localhost:3005/Login', { username: userName, password: password })
                .then(resp => {
                    console.log(resp.data)
                    if (resp.data['msg'] == 'login success') {
                        localStorage.setItem('username', userName)
                        navigate('/toDoList')
                    }
                    else
                        alert('Wrong username and password.')
                })
        }
    }
    return (
        <div style={styles.container}>
            <form onSubmit={login}>
                <label style={styles.userNameLabel}>Username</label>
                <input style={styles.userNameTextField} type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                <label style={styles.passwordLabel}>Password</label>
                <input style={styles.passwordTextField} type='password' onChange={e => setPassword(e.target.value)} />
                <div style={styles.loginButtonDiv}><input style={styles.loginButton} type='submit' value='Login' /></div>
                <div style={styles.loginButtonDiv}><input style={styles.loginButton} type='button' value='Signup' onClick={() => navigate('/signup')} /></div>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'inline-block',
        marginLeft: '30vw',
        padding: '7vw',
        width: '20vw',
        color: 'black',
        backgroundColor: 'lightgreen'
    },
    userNameTextField: {
        width: '15vw'
    },
    passwordTextField: {
        width: '15vw'
    },
    userNameLabel: {
        width: '10vw'
    },
    passwordLabel: {
        width: '10vw'
    },
    loginButton: {
        marginTop: '2vh',
        padding: '1vh',
        width: '10vw'
    },
    loginButtonDiv: {
        width: '15vw',
        display: 'flex',
        justifyContent: 'right'
    }

}