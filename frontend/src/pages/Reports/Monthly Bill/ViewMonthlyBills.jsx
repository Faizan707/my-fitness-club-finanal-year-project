// ViewMonthlyBills.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewMonthlyBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchMonthlyBills();
  }, []);

  const fetchMonthlyBills = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/monthly-bills');
      setBills(response.data.monthly_bills || []);
    } catch (error) {
      console.error('Error fetching monthly bills:', error);
    }
  };

  const handleDelete = async (billId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8001/monthly-bills/${billId}`);
      if (response.data.success) {
        // If deletion is successful, update the bills list
        setBills((prevBills) => prevBills.filter((bill) => bill.id !== billId));
      } else {
        console.error('Error deleting monthly bill:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting monthly bill:', error);
    }
  };

  return (
    <div>
      <h3 style={styles.heading}>Monthly Bills Reports</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td style={styles.td}>{bill.id}</td>
              <td style={styles.td}>{bill.date}</td>
              <td style={styles.td}>{bill.amount}</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(bill.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
};

export default ViewMonthlyBills;
