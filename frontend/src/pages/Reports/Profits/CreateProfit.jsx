import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreateProfit = () => {
  const [dailyProfit, setDailyProfit] = useState('');
  const [monthlyProfit, setMonthlyProfit] = useState('');
  const [yearlyProfit, setYearlyProfit] = useState('');

  const handleCreateProfit = async () => {
    try {
      const response = await axios.post('http://localhost:8001/profits', {
        daily_profit: dailyProfit,
        monthly_profit: monthlyProfit,
        yearly_profit: yearlyProfit,
      });

      console.log('Profit entry created successfully:', response.data);
      // You can reset the form or perform any other action after successful creation.
    } catch (error) {
      console.error('Error creating profit entry:', error);
    }
  };

  return (
    <div>
      <h1>Create Profit Entry</h1>

      <label htmlFor="dailyProfit">Daily Profit:</label>
      <input
        type="text"
        id="dailyProfit"
        value={dailyProfit}
        onChange={(e) => setDailyProfit(e.target.value)}
      />

      <label htmlFor="monthlyProfit">Monthly Profit:</label>
      <input
        type="text"
        id="monthlyProfit"
        value={monthlyProfit}
        onChange={(e) => setMonthlyProfit(e.target.value)}
      />

      <label htmlFor="yearlyProfit">Yearly Profit:</label>
      <input
        type="text"
        id="yearlyProfit"
        value={yearlyProfit}
        onChange={(e) => setYearlyProfit(e.target.value)}
      />

      <button onClick={handleCreateProfit}>Create Profit Entry</button>
      <Link to="/manager-dashboard" className='link'>Back to Manager Page</Link>

    </div>
  );
};

export default CreateProfit;
