import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./AssistantManager.css"
import { useNavigate } from 'react-router-dom';
function AssistantManager() {
  const [newManagerAssistant, setNewManagerAssistant] = useState({
    name: '',
    phone: '',
    ManagerAssistant_id: '',
  });
  
  const navigate= useNavigate()
  const handleNavigate = () =>{
    navigate("/manager-dashboard")
  }
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManagerAssistant((prevManagerAssistant) => ({
      ...prevManagerAssistant,
      [name]: value,
    }));
  };

  const handleCreateManagerAssistant = () => {
    axios
      .post('http://127.0.0.1:8001/api/manager_assistants/', newManagerAssistant)
      .then((response) => {
        console.log('Manager Assistant created successfully:', response.data);
        setNewManagerAssistant({
          name: '',
          phone: '',
          ManagerAssistant_id: '',
        });
      })
      .catch((error) => console.error('Error creating Manager Assistant:', error));
  };



  return (
    <div className="assistant-manager-container">
    

    <div className="create-manager-assistant-form">
      <h2>Create New Manager Assistant</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newManagerAssistant.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={newManagerAssistant.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>ManagerAssistant ID:</label>
        <input
          type="text"
          name="ManagerAssistant_id"
          value={newManagerAssistant.ManagerAssistant_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCreateManagerAssistant}>Create Manager Assistant</button>
      <button onClick={handleNavigate}>Back to Manager page</button>
    </div>
  </div>
);
}

export default AssistantManager;
