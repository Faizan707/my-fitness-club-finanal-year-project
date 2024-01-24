// BackupDate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackupDate = () => {
  const [backups, setBackups] = useState([]);
  const [newBackupDate, setNewBackupDate] = useState('');

  useEffect(() => {
    // GET request to fetch backups
    axios.get('http://127.0.0.1:8001/api/backups/')
      .then(response => setBackups(response.data))
      .catch(error => console.error('Error fetching backups', error));
  }, []);

  const handleAddBackup = () => {
    // POST request to add a new backup
    axios.post('http://127.0.0.1:8001/api/backups/', { download_date: newBackupDate })
      .then(response => {
        setBackups([...backups, response.data]);
        setNewBackupDate(''); // Clear the input field after successful submission
      })
      .catch(error => console.error('Error adding backup', error));
  };

  return (
    <div>
      
      <div>
        <input
          type="date"
          value={newBackupDate}
          onChange={e => setNewBackupDate(e.target.value)}
        />
        <button onClick={handleAddBackup}> Backup Download Date</button>
      </div>
      <h1>Backups</h1>
      <table>
        <thead>
          <tr>
            <th>Download Date</th>
          </tr>
        </thead>
        <tbody>
          {backups.map(backup => (
            <tr key={backup.id}>
              <td>{backup.download_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackupDate;
