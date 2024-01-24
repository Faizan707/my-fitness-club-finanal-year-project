// ViewCustomerReports.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewCustomerReports.css'; // Import the CSS file

function ViewCustomerReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchCustomerReports();
  }, []);

  const fetchCustomerReports = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/customer-reports');
      setReports(response.data.customer_reports || []);
    } catch (error) {
      console.error('Error fetching customer reports:', error);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8001/customer-reports/${reportId}`);
      if (response.data.success) {
        setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
        console.log(response.data.message);
      } else {
        console.error('Error deleting customer report:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting customer report:', error);
    }
  };

  return (
    <div className="customer-reports-container">
      <h3 className="report-heading">Customer Reports</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Customer ID</th>
            <th>Fitness Level</th>
            <th>Improvement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.username}</td>
              <td>{report.customer_id}</td>
              <td>{report.fitness_level}</td>
              <td>{report.improvement}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReport(report.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCustomerReports;
