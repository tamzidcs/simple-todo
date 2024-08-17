import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../../api/users';
import { user } from '../../interfaces/user';
import './Signup.scss';

const newUser: user = {
  username: '',
  password: '',
};
export function Signup() {
  const [signupUser, setSignupUser] = useState<user>(newUser);
  const navigate = useNavigate();

  const addUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
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

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={addUser}>
        <div className="signup-header">Signup</div>
        <label className="signup-label" htmlFor="signup-textfield">
          Username
          <input
            id="signup-textfield"
            className="signup-textfield"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setSignupUser({ ...signupUser, username: e.target.value })}
          />
        </label>
        <label className="signup-label" htmlFor="password-textfield">
          Password
          <input
            className="signup-textfield"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setSignupUser({ ...signupUser, password: e.target.value })}
          />
        </label>
        <div className="signup-button-div">
          <input className="signup-button" type="submit" value="Signup" />
        </div>
      </form>
    </div>
  );
}
export default Signup;