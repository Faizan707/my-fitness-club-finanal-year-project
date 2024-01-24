import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalaryComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [newSalary, setNewSalary] = useState({ date: '', amount: '' });

  const navigate =useNavigate()
  const handleNavigate = () =>{
    navigate("/manager-dashboard")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSalary = async () => {
    try {
      const response = await axios.post('http://localhost:8001/salaries', newSalary);
      if (response.status === 200) {
        console.log('Salary created successfully:', response.data.salary);
      } else {
        console.error('Error creating salary:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating salary:', error);
    }
  };


  return (
    <div>
      <h1>Salaries</h1>
      <ul>
        {salaries.map((salary) => (
          <li key={salary.id}>{`ID: ${salary.id}, Date: ${salary.date}, Amount: ${salary.amount}`}</li>
        ))}
      </ul>

      <h2>Create New Salary</h2>
      <label>Date:</label>
      <input type="date" name="date" value={newSalary.date} onChange={handleInputChange} />
      <br />
      <label>Amount:</label>
      <input type="text" name="amount" value={newSalary.amount} onChange={handleInputChange} />
      <br />
      <button onClick={handlePostSalary}>Create Salary</button>
      <button onClick={handleNavigate}>Back to Manager Page</button>
    </div>
  );
};

export default SalaryComponent;
