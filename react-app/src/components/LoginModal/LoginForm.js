import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
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
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const onDemo = async () => {
    await dispatch(login('demo@aa.io', 'password'));
  };

  let errorMSGs = [];
  if (errors) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

  return (
    <>
      <form className='login-form' onSubmit={onLogin}>
        <div className='error-box'>
          {errorMSGs.map((error, ind) => (
            <div key={ind} className='error'>--{error}</div>
          ))}
        </div>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
        <button className='login-button' type='submit'>Login</button>
      </form>
      <button className='demo-user' onClick={() => onDemo()}>Demo User</button>
    </>
  );
};

export default LoginForm;
