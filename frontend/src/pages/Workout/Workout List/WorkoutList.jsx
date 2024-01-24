// WorkoutList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkList.css'; // Import the CSS file

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

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

  const handleDelete = async (workoutId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8001/delete-workout/${workoutId}`);
      if (response.data.success) {
        window.location.reload();
      } else {
        console.error('Error deleting workout:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div>
      <h2 className="heading">Workout List</h2>
      <table className="workout-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Username</th>
            <th>Workout Name</th>
            <th>Exercises Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => {
            const { fields } = workout;
            return (
              <tr key={workout.pk}>
                <td>{fields.customer_id}</td>
                <td>{fields.username}</td>
                <td>{fields.workout_name}</td>
                <td>{fields.exercises_name}</td>
                <td>{fields.sets}</td>
                <td>{fields.reps}</td>
                <td>
                  <button onClick={() => handleDelete(workout.pk)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;
