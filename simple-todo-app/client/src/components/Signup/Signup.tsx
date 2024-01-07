import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../api/users';
import { user } from '../../interfaces/user';
import { schema } from '../../utils/inputValidator';
import './Signup.scss';

const newUser: user = {
    username: '',
    password: ''
};
const usernameErrorMessage = "Invalid username";
const passwordErrorMessage = "Password must be minimum 8 characters long, should contain one uppercase letter,one lowercase letter,one number and a special character.";

export const Signup = () => {
    const [user, setUser] = useState<user>(newUser);
    const [showUsernameError,setShowUsernameError] = useState(false);
    const [showPasswordError,setShowPasswordError] = useState(false);
    const navigate = useNavigate();

    const addUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { error, value } = schema.validate(user,{abortEarly: false});
        let fieldsWithError: string[] = [];
        if (error) {
            error.details.map((detail)=>{
                return fieldsWithError.push(String(detail.path[0]));
            })
            fieldsWithError.includes('username') ? setShowUsernameError(true) : setShowUsernameError(false);
            fieldsWithError.includes('password') ? setShowPasswordError(true) : setShowPasswordError(false);
        }
        else {
            try {
                const result = await postUser(user);
                if (result) {
                    alert('signup complete.')
                    navigate('/login')
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
                <div className='signup-header' role='header'>Signup</div>
                <label className='signup-label' htmlFor='username'>Username</label>
                <input id='username' className='signup-textfield' type='text' placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
                {showUsernameError && <div id='username-error' className='error-message'>{usernameErrorMessage}</div>}
                <label className='signup-label' htmlFor='password'>Password</label>
                <input id='password' className='signup-textfield' type='password' placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
                {showPasswordError && <div id='password-error' className='error-message'>{passwordErrorMessage}</div>}
                <div className='signup-button-div'><input className='signup-button' type='submit' value='Signup' /></div>
            </form>
        </div>
    )
}
export default Signup;