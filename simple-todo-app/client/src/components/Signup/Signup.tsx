import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../api/users';
import { user } from '../../interfaces/user';
import './Signup.scss';
const newUser: user = {
    username: '',
    password: ''
};
export const Signup = () => {
    const [data, setData] = useState<user>(newUser);
    const navigate = useNavigate();

    const addUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (data.username && data.password) {
            try {
                const result = await postUser(data);
                if (result) {
                    alert('signup complete.')
                    navigate('/login')
                }
                else {
                    alert('Signup unsuccessful.')
                }
            }
            catch (error) {
                alert(error);
            }
        }
    }

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={addUser}>
                <div className='signup-header'>Signup</div>
                <label className='signup-label'>Username</label>
                <input className='signup-textfield' type='text' placeholder="Username" onChange={e => setData({ ...data, username: e.target.value })} />
                <label className='signup-label'>Password</label>
                <input className='signup-textfield' type='password' placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
                <div className='signup-button-div'><input className='signup-button' type='submit' value='Signup' /></div>
            </form>
        </div>
    )
}
export default Signup;