import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryComponent = () => {
  const [salaries, setSalaries] = useState([]);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('http://localhost:8001/salaries'); // Update the URL
      setSalaries(response.data.salaries);
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  };

  const handleDeleteSalary = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/salaries/${id}`); // Update the URL
      console.log(`Salary with ID ${id} deleted successfully`);
      // Refresh the salary list after successful deletion
      fetchSalaries();
    } catch (error) {
      console.error(`Error deleting salary with ID ${id}:`, error);
    }
  };

  useEffect(() => {
    // Fetch salaries when the component mounts
    fetchSalaries();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Salaries</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Amount</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{salary.date}</td>
              <td style={tableCellStyle}>{salary.amount}</td>
              <td>
                <button onClick={() => handleDeleteSalary(salary.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};

export default SalaryComponent;
