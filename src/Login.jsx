import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/auth/user', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setUser(data);
          navigate('/homepage');
        }
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login-container">
      <h1>Welcome to the App</h1>
      <button className="google-login-button" onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
