// AssistantManagerDashboard.jsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssistantManagerDashboard.css'; // Import the CSS file
import ViewCreateAccounts from '../Accounts/View Accouts/ViewCreateAccounts';
import ViewPaidAccounts from '../Accounts/View Paid account/ViewPaidAccouts';

function AssistantManagerDashboard() {
  const { name } = useParams();
  const navigate = useNavigate();

  const PaidAmountNavigate = useNavigate();
  const handlePaidAmountNavigate = () => {
    PaidAmountNavigate("/paid-amounts");
  };
const logoutNavigate = useNavigate()
const handleLogoutNavigate = () =>{
  logoutNavigate("/")
}
  const [showDetails, setShowDetails] = useState(false);
  const [showPaidAccounts, setShowPaidAccounts] = useState(false);
  


  const handleNavigate = () => {
    navigate('/create-account');
  };

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const handleTogglePaidAccounts = () => {
    setShowPaidAccounts((prevShowPaidAccounts) => !prevShowPaidAccounts);
  };

  return (
    <div className="dashboard-container">
      <div className="welcome">
      <h1>Welcome {name}!</h1>
      <button onClick={handleLogoutNavigate}>Logout</button>
      </div>
      <div className="button-container">
        <button className="add-account-button" onClick={handleNavigate}>
          Add Account
        </button>
        <button className="show-details-button" onClick={handleToggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Account Details'}
        </button>
        <button
          className="create-paid-amounts-button"
          onClick={handlePaidAmountNavigate}
        >
          Create Paid Amounts
        </button>
        <button className="view-paid-accounts" onClick={handleTogglePaidAccounts}>
          {showPaidAccounts ? 'Hide Paid Account Details' : 'Show Paid Account Details'}
        </button>

      </div>


      {showDetails && <ViewCreateAccounts />}
      {showPaidAccounts && <ViewPaidAccounts />}
     
    </div>
  );
}

export default AssistantManagerDashboard;
