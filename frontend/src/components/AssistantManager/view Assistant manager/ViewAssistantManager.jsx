import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
function ViewAssistantManager() {
    const [managerAssistants, setManagerAssistants] = useState([]);



    const fetchManagerAssistants = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8001/api/manager_assistants/');
          setManagerAssistants(response.data.manager_assistants);
        } catch (error) {
          console.error('Error fetching Manager Assistants:', error);
        }
      };




useEffect(()=>{
    fetchManagerAssistants();

},[])


const handleDeleteManagerAssistant = (id) => {
    axios
      .delete(`http://127.0.0.1:8001/api/manager_assistants/${id}/`)
      .then((response) => {
        console.log('Manager Assistant deleted successfully:', response.data);
        fetchManagerAssistants();
      })
      .catch((error) => console.error('Error deleting Manager Assistant:', error));
  };







  return (
    <div>
      <h2>Manager Assistants</h2>
    <table className="manager-assistants-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>ManagerAssistant ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {managerAssistants.map((managerAssistant) => (
          <tr key={managerAssistant.id}>
            <td>{managerAssistant.name}</td>
            <td>{managerAssistant.phone}</td>
            <td>{managerAssistant.ManagerAssistant_id}</td>
            <td>
              <button onClick={() => handleDeleteManagerAssistant(managerAssistant.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default ViewAssistantManager
