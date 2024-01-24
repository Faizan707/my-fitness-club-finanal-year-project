import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './managerlogin.css';

function ManagerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const HomeNavigate = useNavigate()
const handleHomeNavigate =()=>{
  HomeNavigate("/")
}
  const handleLogin = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/manager_api');
      const { username: apiUsername, password: apiPassword } = response.data;

      if (username === apiUsername && password === apiPassword) {
        console.log('Login successful');
        navigate('/manager-dashboard');
      } else {
        console.log('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin} className='login-button'>Login</button>
      <button onClick={handleHomeNavigate} className='home'>Back to Home</button>
    </div>
  );
}

export default ManagerLogin;
