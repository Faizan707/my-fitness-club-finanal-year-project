import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewDietPlan.css';

function ViewDietPlan() {
  const [diets, setDiets] = useState([]);
  const [inputUsername, setInputUsername] = useState('');
  const [inputCustomerID, setInputCustomerID] = useState('');
  const [userDiet, setUserDiet] = useState(null);

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

  const handleViewDiet = () => {
    const matchedDiet = diets.find(
      (diet) =>
        diet.fields.username === inputUsername &&
        diet.fields.customer_id === inputCustomerID
    );

    if (matchedDiet) {
      setUserDiet(matchedDiet.fields);
      setInputUsername('');
      setInputCustomerID('');
    } else {
      setUserDiet(null);
      console.log('No diet found for the given username and ID.');
    }
  };

  return (
    <div className='view-diet-container'>
      <h2>View Diet Plan</h2>

      <label htmlFor="inputUsername">Username:</label>
      <input
        type="text"
        id="inputUsername"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />

      <label htmlFor="inputCustomerID">Customer ID:</label>
      <input
        type="text"
        id="inputCustomerID"
        value={inputCustomerID}
        onChange={(e) => setInputCustomerID(e.target.value)}
      />

      <button onClick={handleViewDiet}>View Diet</button>

      {userDiet && (
        <div className="details">
          <h3>Diet Details</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Food name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userDiet.food_name}</td>
                <td>{userDiet.quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDietPlan;
