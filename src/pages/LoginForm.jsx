import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import "../pages/LoginForm.css"
import Logo from "../assets/images/logo-dark.png";

const LoginForm = () => {
//   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    
    // navigate('/dashboard');
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
            />
          </div>
          <div className='login-button'>
            
          <button type="submit" className='login-in-button'>Log in</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
