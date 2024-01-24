import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CustomerSign.css"
function CustomerSignin() {
  const [customerData, setCustomerData] = useState([]);
  const [inputUsername, setInputUsername] = useState('');
  const [inputCustomerID, setInputCustomerID] = useState('');

  const navigate = useNavigate();
const HomeNavigate = useNavigate()
const handleHomeNavigate = () =>{
  HomeNavigate("/")
}
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8001/api/customer_registration/");
      setCustomerData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  const handleSignin = () => {
  
    const match = customerData.find(
      (entry) =>
        entry.username === inputUsername &&
        entry.customer_id === inputCustomerID
    );
  
    console.log("Match:", match);
  
    if (match) {
      navigate(`/customer-login-page/${match.username}`);
      console.log('Sign in successful');
    } else {
      console.log('Invalid credentials');
    }
  };
  
  

  return (
    <div className="container">
    <label htmlFor="inputUsername" className="label">
      Username:
    </label>
    <input
      type="text"
      id="inputUsername"
      value={inputUsername}
      onChange={(e) => setInputUsername(e.target.value)}
      className="input"
    />

    <label htmlFor="inputCustomerID" className="label">
      Customer ID:
    </label>
    <input
      type="text"
      id="inputCustomerID"
      value={inputCustomerID}
      onChange={(e) => setInputCustomerID(e.target.value)}
      className="input"
    />

    <button onClick={handleSignin} className="button">
      Sign In
    </button>
    

    <button onClick={handleHomeNavigate}>Back to Home</button>
  </div>
);
  
}

export default CustomerSignin;
