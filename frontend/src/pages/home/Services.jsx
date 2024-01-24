import React from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {

  const navigate = useNavigate()
  const handleNavigate = () =>{

    navigate("/")
  }
  
  return (
    <div style={styles.container}>
      <div className="services-container" style={{display:"flex",justifyContent:"space-between"}}>
      <h1 style={styles.heading}>Our Services</h1>
      <button onClick={handleNavigate}>Back to Home</button>
      </div>

      <div style={styles.service}>
        <h2 style={styles.serviceTitle}>Workouts</h2>
        <p style={styles.serviceDescription}>
          We provide variety of workouts and training 
        </p>
      </div>

      <div style={styles.service}>
        <h2 style={styles.serviceTitle}>Personal Training</h2>
        <p style={styles.serviceDescription}>
          Get personalized training sessions with our experienced fitness trainers.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  service: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  serviceTitle: {
    color: '#007BFF',
    marginBottom: '10px',
  },
  serviceDescription: {
    color: '#555',
  },
};

export default Services;
