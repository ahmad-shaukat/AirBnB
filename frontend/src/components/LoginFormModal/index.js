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
    return dispatch(sessionActions.login({credential:'Demo-lition', password:'password'})).then(closeModal)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
     {Object.keys(errors).map((key) => (
                    <li key={key}>{errors[key]}</li>
                ))}
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      
    </form>
    <div>
      <button type = 'button' style={{background:'green'}} onClick={demoHandle}>DemoUser</button>

    </div>
    </>
  );
}

export default LoginFormModal;