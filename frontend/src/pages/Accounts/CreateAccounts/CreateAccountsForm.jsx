import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccountsForm.css'; 
import { useNavigate } from 'react-router-dom';

const CreateAccountsForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    username: '',
    Customer_Fee_amount: '',
    staff_salary_amount: '',
    rent_amount: '',
    payment_date: ''
  });
   const navigate =useNavigate()
   const handleNavigate = ()=>{
    navigate("/assistant-manager-signin")
   }
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8001/create-account/', formData);
      console.log('Account created successfully:', response.data);

      setSuccessMessage('Account created successfully');

      setFormData({
        customer_id: '',
        username: '',
        Customer_Fee_amount: '',
        staff_salary_amount: '',
        rent_amount: '',
        payment_date: ''
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="create-account-container">
      <h1>Create Account</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
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
          Customer Fee Amount:
          <input type="text" name="Customer_Fee_amount" value={formData.Customer_Fee_amount} onChange={handleChange} />
        </label>
        <br />

        <label>
          Staff Salary Amount:
          <input type="text" name="staff_salary_amount" value={formData.staff_salary_amount} onChange={handleChange} />
        </label>
        <br />

        <label>
          Rent Amount:
          <input type="text" name="rent_amount" value={formData.rent_amount} onChange={handleChange} />
        </label>
        <br />

        <label>
          Payment Date:
          <input type="date" name="payment_date" value={formData.payment_date} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Create Account</button>
        <button onClick={handleNavigate} className='back-to-assistant-manager-button'>Back to Assistant manager Page</button>
      </form>
    </div>
  );
};

export default CreateAccountsForm;
