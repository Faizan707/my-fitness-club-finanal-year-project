import React, { useState } from 'react';
import axios from 'axios';
import './DietPlanForm.css'; 
import { useNavigate } from 'react-router-dom';

const DietPlanForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    username: '',
    food_name: '',
    quantity: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const navigate =useNavigate()
  const handleNavigate = () =>{
    navigate("/manager-dashboard")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8001/create-diet', formData);

      if (response.data.success) {
        setSuccessMessage('Diet created successfully');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage(response.data.message);
      }

      setFormData({
        customer_id: '',
        username: '',
        food_name: '',
        quantity: ''
      });
    } catch (error) {
      console.error('Error creating diet:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred while creating the diet');
    }
  };

  return (
    <div className="diet-plan-container">
      <h1>Create Diet</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input type="text" name="customer_id" value={formData.customer_id} onChange={handleChange} />
        </label>
        <br />

        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />

        <label>
          Food Name:
          <input type="text" name="food_name" value={formData.food_name} onChange={handleChange} />
        </label>
        <br />

        <label>
          Quantity:
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Create Diet</button>
        <button onClick={handleNavigate}>Back to Manager Page</button>
      </form>
    </div>
  );
};

export default DietPlanForm;
