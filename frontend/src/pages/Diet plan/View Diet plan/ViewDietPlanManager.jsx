import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewDietPlanManager() {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/get-diet');
        setDiets(response.data.diets);
      } catch (error) {
        console.error('Error fetching diets:', error);
      }
    };

    fetchDiets();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Diet Plans</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Customer ID</th>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Food Name</th>
            <th style={tableHeaderStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {diets.map((diet, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>{diet.fields?.customer_id}</td>
              <td style={tableCellStyle}>{diet.fields?.username}</td>
              <td style={tableCellStyle}>{diet.fields?.food_name}</td>
              <td style={tableCellStyle}>{diet.fields?.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: '#45a049',
  padding: '12px',
  textAlign: 'left',
};

const tableRowStyle = {
  borderBottom: '1px solid #45a049',
};

const tableCellStyle = {
  padding: '10px',
};

export default ViewDietPlanManager;
