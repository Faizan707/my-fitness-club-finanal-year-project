// CustomerReports.js
import React, { useState } from 'react';
import axios from 'axios';
import './CustomerReports.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function CustomerReports() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    username: '',
    customer_id: '',
    fitness_level: '',
    improvement: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };



    const managerNavigate = useNavigate()

    const handleManagerNavigate = ()=>{
        managerNavigate("/manager-dashboard")
    }



  const handleCreateReport = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8001/customer-reports', newReport);

      if (response.data.success) {
        setReports((prevReports) => [...prevReports, response.data.report]);
        setNewReport({
          username: '',
          customer_id: '',
          fitness_level: '',
          improvement: '',
        });
        setSuccessMessage('Customer report created successfully');
        // Clear success message after a few seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Error creating customer report:', response.data.message);
        setSuccessMessage(`Error creating report: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error creating customer report:', error);
      setSuccessMessage('Error creating report');
    }
  };

  return (
    <div className="container">
      <h3>Create New Report</h3>
      <div className="form-container">
        <label className="label">
          Username:
          <input type="text" name="username" value={newReport.username} onChange={handleInputChange} className="input" />
        </label>
        <br />
        <label className="label">
          Customer ID:
          <input type="text" name="customer_id" value={newReport.customer_id} onChange={handleInputChange} className="input" />
        </label>
        <br />
        <label className="label">
          Fitness Level:
          <input type="text" name="fitness_level" value={newReport.fitness_level} onChange={handleInputChange} className="input" />
        </label>
        <br />
        <label className="label">
          Improvement:
          <input type="text" name="improvement" value={newReport.improvement} onChange={handleInputChange} className="input" />
        </label>
        <br />
        <button onClick={handleCreateReport} className="button">
          Create Report
        </button>
        <button onClick={handleManagerNavigate}>Back to manager dashboard</button>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default CustomerReports;
