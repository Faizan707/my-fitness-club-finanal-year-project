import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const RentComponent = () => {
  const [newRent, setNewRent] = useState({ date: '', amount: '' });

  

  const handleCreateRent = async () => {
    try {
      const response = await axios.post('http://localhost:8001/rents', newRent); 
      console.log(response.data.message);
      setNewRent({ date: '', amount: '' }); 
    } catch (error) {
      console.error('Error creating rent:', error);
    }
  };

  return (
    <div>
      <h1>Create New Rent Entry</h1>

      <label>
        Date:
        <input
          type="date"
          value={newRent.date}
          onChange={(e) => setNewRent({ ...newRent, date: e.target.value })}
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          value={newRent.amount}
          onChange={(e) => setNewRent({ ...newRent, amount: e.target.value })}
        />
      </label>
      <button onClick={handleCreateRent}>Create Rent</button>
      <Link to="/manager-dashboard" className='link'>Back to Manager Page</Link>

    </div>
  );
};

export default RentComponent;
