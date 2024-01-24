import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewRent = () => {
  const [rents, setRents] = useState([]);
  const [deleteRentId, setDeleteRentId] = useState('');

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/rents');
      setRents(response.data.rents);
    } catch (error) {
      console.error('Error fetching rents:', error);
    }
  };

  const handleDeleteRent = async (id) => {
    console.log('Deleting rent with ID:', id); // Add this line for debugging
    try {
      await axios.delete(`http://127.0.0.1:8001/rents/${id}`);
      console.log(`Rent with ID ${id} deleted successfully`);
      fetchRents(); // Refresh the rent list after successful deletion
    } catch (error) {
      console.error(`Error deleting rent with ID ${id}:`, error);
    }
  };
  
  return (
    <div>
      <h1>Rents</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rents.map((rent) => (
            <tr key={rent.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{rent.date}</td>
              <td>{rent.amount}</td>
              <td>
                <button onClick={() => handleDeleteRent(rent.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRent;
