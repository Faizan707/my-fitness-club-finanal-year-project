// src/components/InstructorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstructorList.css'; // Import the CSS file

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/instructors');
        setInstructors(response.data.instructors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (instructorId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8001/api/instructors/${instructorId}`);
      if (response.data.success) {
        // If deletion is successful, update the instructors list
        setInstructors((prevInstructors) =>
          prevInstructors.filter((instructor) => instructor.instructor_ID !== instructorId)
        );
      } else {
        console.error('Error deleting instructor:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-header">Instructor List</h2>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Name</th>
            <th className="table-cell">Instructor ID</th>
            <th className="table-cell">Phone Number</th>
            <th className="table-cell">Qualification</th>
            <th className="table-cell">Timings</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor, index) => (
            <tr key={index} className="table-cell">
              <td>{instructor.name}</td>
              <td>{instructor.instructor_ID}</td>
              <td>{instructor.instructor_phone_no}</td>
              <td>{instructor.qualification}</td>
              <td>{instructor.timings}</td>
              <td>
                <button onClick={() => handleDelete(instructor.instructor_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorList;
