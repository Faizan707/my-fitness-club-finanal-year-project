import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./CreateInstructorForm.css"
const CreateInstructorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    instructor_ID: '',
    instructor_phone_no: '',
    qualification: '',
    timings: '',
  });

  

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8001/api/instructors', formData);
      setSuccessMessage('Instructor created successfully');

      setFormData({
        name: '',
        instructor_ID: '',
        instructor_phone_no: '',
        qualification: '',
        timings: '',
      });
    } catch (error) {
      console.error('Error creating instructor:', error);
    }
  };

  return (
    <div className='create-instructor-container'>
      <h2>Create Instructor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Instructor ID:
          <input type="text" name="instructor_ID" value={formData.instructor_ID} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="instructor_phone_no" value={formData.instructor_phone_no} onChange={handleChange} />
        </label>
        <br />

        <label>
          Qualification:
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
        </label>
        <br />

        <label>
          Timings:
          <input type="text" name="timings" value={formData.timings} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Create Instructor</button>
        <Link to="/manager-dashboard" className='link'>Back to Manager Page</Link>

      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default CreateInstructorForm;
