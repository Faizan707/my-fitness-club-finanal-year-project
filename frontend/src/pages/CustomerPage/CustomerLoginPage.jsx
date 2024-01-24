import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ViewWorkoutPlan from './customerpageComponent/ViewWorkoutPlan';
import ViewDietPlan from './View Diet/ViewDietPlan';
import './CustomerLoginPage.css';

function CustomerLoginPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [showDiet, setShowDiet] = useState(false);

  function handleNavigate() {
    navigate('/');
  }

  function handleViewWorkoutPlan() {
    setShowWorkoutPlan(!showWorkoutPlan);
    setShowDiet(false);
  }

  function handleViewDietPlan() {
    setShowDiet(!showDiet);
    setShowWorkoutPlan(false);
  }

  return (
    <div>
      <nav className='customer-navbar'>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleNavigate}>Logout</button>
      </nav>
      <button className='view-workout-plan' onClick={handleViewWorkoutPlan}>
        {showWorkoutPlan ? 'Hide Workout Plan' : 'View Workout Plan'}
      </button>
      <button className='view-diet-button' onClick={handleViewDietPlan}>
        {showDiet ? 'Hide Diet Plan' : 'View Diet Plan'}
      </button>
      {showWorkoutPlan && <ViewWorkoutPlan />}
      {showDiet && <ViewDietPlan />}
    </div>
  );
}

export default CustomerLoginPage;
