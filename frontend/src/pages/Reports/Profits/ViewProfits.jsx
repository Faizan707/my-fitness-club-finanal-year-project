import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfit = () => {
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    fetchProfits();
  }, []);

  const fetchProfits = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/profits');
      setProfits(response.data.profits);
    } catch (error) {
      console.error('Error fetching profits:', error);
    }
  };

  const handleDeleteProfit = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8001/profits/${id}`);
      console.log(`Profit with ID ${id} deleted successfully`);
      fetchProfits(); // Refresh the profit list after successful deletion
    } catch (error) {
      console.error(`Error deleting profit with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h1>Profits</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Daily Profit</th>
            <th>Monthly Profit</th>
            <th>Yearly Profit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {profits.map((profit) => (
            <tr key={profit.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{profit.daily_profit}</td>
              <td>{profit.monthly_profit}</td>
              <td>{profit.yearly_profit}</td>
              <td>
                <button onClick={() => handleDeleteProfit(profit.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProfit;
