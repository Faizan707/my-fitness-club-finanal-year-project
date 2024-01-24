import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPaidAccounts = () => {
  const [paidAccounts, setPaidAccounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/get-paid-accounts/');
      setPaidAccounts(response.data.paid_accounts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Paid Accounts</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer</th>
            <th>Payment Date</th>
            <th>Customer Fee Paid</th>
            <th>Staff Salary Paid</th>
            <th>Rent Paid</th>
          </tr>
        </thead>
        <tbody>
          {paidAccounts.map(account => (
            <tr key={account.id}>
              <td>{account.customer_id}</td>
              <td>{account.customer}</td>
              <td>{account.payment_date}</td>
              <td>{account.customer_fee_paid}</td>
              <td>{account.staff_salary_paid}</td>
              <td>{account.rent_paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPaidAccounts;
