// ViewCreateAccounts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewCreateAccounts.css'; 

const ViewCreateAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/get-accounts/');
      setAccounts(response.data.accounts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (accountId) => {
    try {
      await axios.delete(`http://127.0.0.1:8001/delete-account/${accountId}/`);
      fetchData(); 
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  
  return (
    <div className="accounts-container">
      <h1>Accounts</h1>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Customer ID</th>
            <th>Username</th>
            <th>Customer Fee Amount</th>
            <th>Staff Salary Amount</th>
            <th>Rent Amount</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.customer}</td>
              <td>{account.username}</td>
              <td>{account.customer_fee_amount}</td>
              <td>{account.staff_salary_amount}</td>
              <td>{account.rent_amount}</td>
              <td>{account.payment_date}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCreateAccounts;
