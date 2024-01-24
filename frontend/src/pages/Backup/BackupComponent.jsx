import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackupDate from './BackupDate';

const BackupComponent = () => {
    const [downloadLink, setDownloadLink] = useState(null);

    const downloadBackup = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/download_backup/', {
          responseType: 'blob',
        });
  
        const blob = new Blob([response.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        setDownloadLink(url);
      } catch (error) {
        console.error('Error downloading backup:', error);
      }
    };
  
    return (
      <div>
        <h1>Download Backup</h1>
        <button onClick={downloadBackup}>Download Backup</button>
        {downloadLink && (
          <a href={downloadLink} download="backup.json">
            Click here to download the backup file
          </a>
        )}
        <BackupDate/>
      </div>
    );

};

export default BackupComponent;
