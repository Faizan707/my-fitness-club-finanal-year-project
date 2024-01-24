// AddWorkout.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddWorkout.css'
const AddWorkout = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    username: '',
    workout_name: '',
    exercises_name: '',
    sets: '',
    reps: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const managerNavigate = useNavigate();

  const handleManagerNavigate = () => {
    managerNavigate("/manager-dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8001/create-workout', formData);

      if (response.data.success) {
        console.log('Workout created successfully');
        setFormData({
          customer_id: '',
          username: '',
          workout_name: '',
          exercises_name: '',
          sets: '',
          reps: '',
        });
      } else {
        console.error('Error creating workout:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating workout:', error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="addWorkout-container">
        <h2 className="heading">Add Workout</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Customer ID:
            <input
              type="text"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="label">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="label">
            Workout Name:
            <input
              type="text"
              name="workout_name"
              value={formData.workout_name}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="label">
            Exercises Name:
            <input
              type="text"
              name="exercises_name"
              value={formData.exercises_name}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="label">
            Sets:
            <input
              type="text"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="label">
            Reps:
            <input
              type="text"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              className="input"
            />
          </label>

          <button type="submit" className="button">
            Add Workout
          </button>
          <button onClick={handleManagerNavigate} className="back-to-manager button">
            Back to Manager Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout;
