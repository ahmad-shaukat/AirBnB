import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {

        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);


      });
  }
  const demoHandle = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' })).then(closeModal)
  }
  let allowLoginCursor = ''
  const checkCredentials = () => {
    if (password.length <6 || credential.length < 4) {
      return true
    }
    return false
    allowLoginCursor='pointer'
  }
  console.log (checkCredentials())

  return (
    <>
    {Object.keys(errors).map((key) => (
      <li key={key} className='errors'>{errors[key]}</li>
    ))}
      <div className='login-container'>
        <div className='heading-container'>
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
          <p className='login-heading' >Log In</p>
        </div>

        <form onSubmit={handleSubmit} className='login-form'>
          {/* <label className='credential'> */}

          <p className='heading'>Welcome to Airbnb</p>
          <input className='credential'
            type="text"
            value={credential}
            placeholder='Username or Email'
            // minLength='4'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          {/* </label> */}
          {/* <label> */}

          <input className='password'
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* </label> */}
          <button type="submit" className='login' disabled ={checkCredentials()} style={{cursor:'pointer'}}>Log In</button>

        </form>
        

      <button type='button' style={{cursor:{allowLoginCursor} }} onClick={demoHandle} className='demo-button'>DemoUser</button>
      
      
      </div>
    </>
  );
}

export default LoginFormModal;