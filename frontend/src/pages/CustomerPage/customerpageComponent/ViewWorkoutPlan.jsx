import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ViewWorkoutPlan.css"
function ViewWorkoutPlan() {
  const [workouts, setWorkouts] = useState([]);
  const [inputUsername, setInputUsername] = useState('');
  const [inputCustomerID, setInputCustomerID] = useState('');
  const [userWorkout, setUserWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/get-workouts');
        setWorkouts(response.data.workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleViewWorkout = () => {
    const matchedWorkout = workouts.find(
      (workout) =>
        workout.fields.username === inputUsername &&
        workout.fields.customer_id === inputCustomerID
    );
  
    if (matchedWorkout) {
      setUserWorkout(matchedWorkout.fields);
      setInputUsername('');
      setInputCustomerID('');
    } else {
      setUserWorkout(null);
      console.log('No workout found for the given username and ID.');
    }
  };
  

  return (
    <div className='view-workout-container'>
      <h2>View Workout Plan</h2>

      <label htmlFor="inputUsername">Username:</label>
      <input
        type="text"
        id="inputUsername"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />

      <label htmlFor="inputCustomerID ">Customer ID:</label>
      <input
        type="text"
        id="inputCustomerID"
        value={inputCustomerID}
        onChange={(e) => setInputCustomerID(e.target.value)}
      />

      <button onClick={handleViewWorkout}>View Workout</button>

      
    {userWorkout && (
      <div className="details">
        <h3>Workout Details</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Workout</th>
              <th>Exercises</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userWorkout.workout_name}</td>
              <td>{userWorkout.exercises_name}</td>
              <td>{userWorkout.sets}</td>
              <td>{userWorkout.reps}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
}

export default ViewWorkoutPlan;
