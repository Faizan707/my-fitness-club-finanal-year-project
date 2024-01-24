// MonthlyBills.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MonthlyBills = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({
    date: '',
    amount: '',
  });
const navigate =useNavigate()
function handleNavigate(){
    navigate("/manager-dashboard")
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prevBill) => ({
      ...prevBill,
      [name]: value,
    }));
  };

  const handleCreateBill = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8001/monthly-bills', newBill);

      if (response.data.success) {
        setBills((prevBills) => [...prevBills, response.data.bill]);
        setNewBill({
          date: '',
          amount: '',
        });
        console.log('Monthly bill created successfully');
      } else {
        console.error('Error creating monthly bill:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating monthly bill:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Create New Monthly Bill</h3>
      <div style={styles.formContainer}>
        <label style={styles.label}>
          Date:
          <input type="date" name="date" value={newBill.date} onChange={handleInputChange} style={styles.input} />
        </label>
        <label style={styles.label}>
          Amount:
          <input type="text" name="amount" value={newBill.amount} onChange={handleInputChange} style={styles.input} />
        </label>
        <button onClick={handleCreateBill} style={styles.button}>
          Create Monthly Bill
        </button>
        <button onClick={handleNavigate}>Back to manager dashboard</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '50%',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    margin: '10px 0',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'border 0.3s',
    width: '100%',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom:"10px"
  },
};

export default MonthlyBills;
