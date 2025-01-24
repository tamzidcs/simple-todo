import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../../api/users';
import { user } from '../../../interfaces/user';
import './Signup.scss';

const newUser: user = {
  username: '',
  password: '',
};

export function Signup() {
  const [signupUser, setSignupUser] = useState<user>(newUser);
  const navigate = useNavigate();

  const addUser = async () => {
    if (signupUser.username && signupUser.password) {
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        aria-label="signup-form"
        onSubmit={handleSubmit}
      >
        <div className="signup-header" data-testid="signup-header">
          Signup
        </div>
        <label
          className="signup-label"
          data-testid="username-label"
          htmlFor="signup-textfield"
        >
          Username
          <input
            id="signup-textfield"
            className="signup-textfield"
            data-testid="username-textfield"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setSignupUser({ ...signupUser, username: e.target.value })}
          />
        </label>
        <label
          className="signup-label"
          data-testid="password-label"
          htmlFor="password-textfield"
        >
          Password
          <input
            className="signup-textfield"
            data-testid="password-textfield"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setSignupUser({ ...signupUser, password: e.target.value })}
          />
        </label>
        <div className="signup-button-div">
          <input
            className="signup-button"
            data-testid="signup-button"
            type="submit"
            value="Signup"
          />
        </div>
      </form>
    </div>
  );
}
export default Signup;
