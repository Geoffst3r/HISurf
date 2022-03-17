import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({ callSetter }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    if (!data && callSetter) callSetter();
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  let errorMSGs = [];
  if (errors) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

  return (
    <>
      <button className='close-modal-button' onClick={() => callSetter()}>X</button>
      <p className='loginForm-title'>Log in</p>
      <p className='loginForm-welcome-message'>Welcome to HI Surf</p>
      <div className='login-error-box'>
        {errors.length > 0 &&
          errorMSGs.map((error, ind) => (
            <div key={ind} className='login-error'><i className='fas fa-times-circle' /> {error}</div>
          ))
        }
      </div>
      <form className='login-form' onSubmit={onLogin}>
        <input
          className='loginForm-email'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
        <input
          className='loginForm-password'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
        <button className='login-button' type='submit'>Continue</button>
      </form>
    </>
  );
};

export default LoginForm;
