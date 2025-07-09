import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/LoginForm.css"
import {login} from "../services/apiAuth"
import { useLogin } from '../services/useLogin';
import Logo from "../assets/images/logo-dark.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("susan@gmail.com"); //default email
  const [password, setPassword] = useState("okami012"); //default password
  const {login, isLoading} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return
    login({email, password})
    // console.log("Logging in with:", email, password);

    // return(navigate('/'))
  }

  return (
    <section className="section1">
      <div className='login-container'>
        <div className="login-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>Log in to your account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="login-input1">
            <p>Email address</p>
            <input
            className='login-input'
            id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='demo@example.com'
              disabled={isLoading}
            />
          </div>
          <div className="login-input1">
            <p>Password</p>
            <input
            className='login-input'
            id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='********'
              disabled={isLoading}
            />
          </div>
          <div className='login-button'>
            
          <button disabled={isLoading} type="submit" className='login-in-button'>Log in</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
