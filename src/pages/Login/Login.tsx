import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/users');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="logo.svg" alt="Logo" className="logo" />
        <img src="signinpage.svg" alt="Login" className="login-image" />
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Welcome!</h2>
            <p>Enter details to login.</p>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? 'HIDE' : 'SHOW'}
                </span>
              </div>
            </div>
            <div className="forgot-password">
              <a href="/">FORGOT PASSWORD?</a>
            </div>
            <button type="submit" className="login-button">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;