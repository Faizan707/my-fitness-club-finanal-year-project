import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AssistantManagerLogin.css';

function AssistantManagerLogin() {
  const [assistantManagerData, setAssistantManagerData] = useState([]);
  const [inputAssistantManagerName, setAssistantManagerName] = useState('');
  const [inputAssistantManagerID, setAssistantManagerID] = useState('');
  const navigate = useNavigate();
const HomeNavigate =useNavigate()
const handleHomeNavigate =()=>{
  HomeNavigate("/")
}
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/api/manager_assistants/');
      setAssistantManagerData(response.data.manager_assistants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssistantManagerSignin = () => {
    const match = assistantManagerData.find(
      (entry) => entry.name === inputAssistantManagerName && entry.ManagerAssistant_id === inputAssistantManagerID
    );
  
 
  
    if (match) {
      navigate(`/assistant-manager-dashboard/${match.name}`);
      console.log('Sign in successful');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <label htmlFor="inputAssistantManagerName">Name:</label>
      <input
        type="text"
        value={inputAssistantManagerName}
        onChange={(e) => setAssistantManagerName(e.target.value)}
        className="input-field"
      />

      <label htmlFor="inputAssistantManagerID">ID:</label>
      <input
        type="text"
        value={inputAssistantManagerID}
        onChange={(e) => setAssistantManagerID(e.target.value)}
        className="input-field"
      />

      <button onClick={handleAssistantManagerSignin} className="signin-button">
        Sign In
      </button>
      <button onClick={handleHomeNavigate} >Back to Home</button>
    </div>
  );
}

export default AssistantManagerLogin;
