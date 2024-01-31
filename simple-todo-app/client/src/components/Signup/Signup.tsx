import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../api/users';
import { user } from '../../interfaces/user';
import { schema } from '../../utils/inputValidator';
import './Signup.scss';

const newUser: user = {
  username: '',
  password: '',
};
const usernameErrorMessage = 'Invalid username';
const passwordErrorMessage = 'Password must be minimum 8 characters long, should contain one uppercase letter,one lowercase letter,one number and a special character.';

export function Signup() {
  const [signupUser, setSignupUser] = useState<user>(newUser);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSignupError = () => {
    const { error } = schema.validate(signupUser, { abortEarly: false });
    const fieldsWithError: string[] = [];
    if (error) {
      error.details.map((detail) => fieldsWithError.push(String(detail.path[0])));
      if (fieldsWithError.includes('username')) {
        setShowUsernameError(true);
      } else {
        setShowUsernameError(false);
      }
      if (fieldsWithError.includes('password')) {
        setShowPasswordError(true);
      } else {
        setShowPasswordError(false);
      }
      return true;
    }
    return false;
  };

  const handleSignup = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const errorExists = handleSignupError();
    if (!errorExists) {
      try {
        const result = await postUser(signupUser);
        if (result) {
          alert('signup complete.');
          navigate('/login');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateSignupUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupUser({ ...signupUser, username: event.target.value });
  };

  const updateSignupPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupUser({ ...signupUser, password: event.target.value });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="signup-header">Signup</div>
        <label className="signup-label" htmlFor="username">
          Username
          <input
            id="username"
            className="signup-textfield"
            type="text"
            placeholder="Username"
            onChange={(event) => updateSignupUsername(event)}
          />
        </label>
        {showUsernameError && (
          <div id="username-error" className="error-message">
            {usernameErrorMessage}
          </div>
        )}
        <label className="signup-label" htmlFor="password">
          Password
          <input
            id="password"
            className="signup-textfield"
            type="password"
            placeholder="Password"
            onChange={(event) => updateSignupPassword(event)}
          />
        </label>
        {showPasswordError && (
          <div id="password-error" className="error-message">
            {passwordErrorMessage}
          </div>
        )}
        <div className="signup-button-div">
          <input className="signup-button" type="submit" value="Signup" />
        </div>
      </form>
    </div>
  );
}
export default Signup;
