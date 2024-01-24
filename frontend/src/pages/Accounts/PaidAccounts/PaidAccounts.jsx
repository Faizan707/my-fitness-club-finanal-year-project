// PaidAccounts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaidAccounts.css';  // Import the CSS file

const PaidAccounts = () => {
  const [paidAccounts, setPaidAccounts] = useState([]);
  const [formData, setFormData] = useState({
    username:"",
    customer_id: '',
    payment_date: '',
    customer_fee_paid: '',
    staff_salary_paid: '',
    rent_paid: '',
  });

  useEffect(() => {
    fetchPaidAccounts();
  }, []);

  const fetchPaidAccounts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/get-paid-accounts/');
      setPaidAccounts(response.data.paid_accounts);
    } catch (error) {
      console.error('Error fetching paid accounts:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8001/create-paid-account/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchPaidAccounts();
    } catch (error) {
      console.error('Error creating paid account:', error);
    }
  };

  return (
    <div className="paid-accounts-container">
      <h2>Paid Accounts</h2>

      <form className="paid-account-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" 
        name='username'
        value={formData.username}
        onChange={handleChange}
        className='form-input'
        />
        

        <label htmlFor="payment_date" className="form-label">Payment Date:</label>
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="customer_fee_paid" className="form-label">Customer Fee Paid:</label>
        <input
          type="text"
          name="customer_fee_paid"
          value={formData.customer_fee_paid}
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="staff_salary_paid" className="form-label">Staff Salary Paid:</label>
        <input
          type="text"
          name="staff_salary_paid"
          value={formData.staff_salary_paid}
          onChange={handleChange}
          className="form-input"
        />

        <label htmlFor="rent_paid" className="form-label">Rent Paid:</label>
        <input
          type="text"
          name="rent_paid"
          value={formData.rent_paid}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="form-button">Create Paid Account</button>
      </form>

      <h3 className="paid-account-details-header">Paid Account Details</h3>
      <table className="paid-accounts-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Payment Date</th>
            <th>Customer Fee Paid</th>
            <th>Staff Salary Paid</th>
            <th>Rent Paid</th>
          </tr>
        </thead>
        <tbody>
          {paidAccounts.map((paidAccount) => (
            <tr key={paidAccount.id}>
              <td>{paidAccount.customer}</td>
              <td>{paidAccount.payment_date}</td>
              <td>{paidAccount.customer_fee_paid}</td>
              <td>{paidAccount.staff_salary_paid}</td>
              <td>{paidAccount.rent_paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaidAccounts;
