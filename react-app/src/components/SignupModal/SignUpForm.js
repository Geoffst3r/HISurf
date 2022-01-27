import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import './SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  let errorMSGs = [];

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['confirm : Passwords do not match.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (errors) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

  return (
    <form onSubmit={onSignUp} className='signup-form' autoComplete='off'>
      {errors.length > 0 &&
        <div className='signup-error-box'>
          {errorMSGs.map((error, ind) => (
            <div key={ind} className='signup-error'><i className='fas fa-times-circle' /> {error}</div>
          ))}
      </div>}
      <input
        type='text'
        name='username'
        placeholder='Username'
        onChange={updateUsername}
        value={username}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        onChange={updateEmail}
        value={email}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={updatePassword}
        value={password}
      />
      <input
        type='password'
        name='repeat_password'
        placeholder='Confirm Password'
        onChange={updateRepeatPassword}
        value={repeatPassword}
        required={true}
      />
      <button type='submit' className='signup-button'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
