import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const axios = require('axios')

export function Signup() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
     
    const addUser = (event) => {
        event.preventDefault()
        if (userName && password) {
            axios.post('http://localhost:3005/Users', { username: userName, password: password })
                .then(resp => {
                    console.log(resp.data)
                    alert('signup complete.')
                    navigate('/login')
                })
        }
    }
    return (
        <div style={styles.container}>
            <form onSubmit={addUser}>
                <label style={styles.userNameLabel}>Username</label>
                <input style={styles.userNameTextField} type='text' value={userName} onChange={e => setUserName(e.target.value)} />
                <label style={styles.passwordLabel}>Password</label>
                <input style={styles.passwordTextField} type='password' onChange={e => setPassword(e.target.value)} />
                <div style={styles.signupButtonDiv}><input style={styles.signupButton} type='submit' value='Signup' /></div>
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
    signupButton: {
        marginTop: '2vh',
        padding: '1vh',
        width: '10vw'
    },
    signupButtonDiv: {
        width: '15vw',
        display: 'flex',
        justifyContent: 'right'
    }

}