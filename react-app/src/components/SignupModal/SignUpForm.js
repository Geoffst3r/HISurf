import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login, signUp } from '../../store/session';
import './SignupForm.css';

const SignUpForm = ({ callSetter }) => {
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
      if (!data && callSetter) callSetter();
    } else {
      setErrors(['confirm : Passwords do not match.'])
    }
  };

  const onDemo = async () => {
    await dispatch(login('demo@aa.io', 'password'));
    return callSetter();
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
    <>
      <button className='close-modal-button' onClick={() => callSetter()}>X</button>
      <p className='signupForm-title'>Sign up</p>
      <p className='signupForm-welcome-message'>Welcome to HI Surf</p>
      {errors.length > 0 && <div className='signup-error-box'>
        {errorMSGs.map((error, ind) => (
          <div key={ind} className='signup-error'><i className='fas fa-times-circle' /> {error}</div>
        ))}
      </div>}
      <form onSubmit={onSignUp} className='signup-form' autoComplete='off'>
        <input
          className='signupForm-username'
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
          className='signupForm-confirm-password'
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        />
        <button type='submit' className='signup-button'>Continue</button>
        <button className='demo-user-modals' type='submit' onClick={onDemo}>Demo User Login</button>
      </form>
    </>
  );
};

export default SignUpForm;
