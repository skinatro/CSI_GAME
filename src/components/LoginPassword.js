// src/components/LoginPassword.js
import React, { useState, useEffect } from 'react';
import { Fieldset } from 'react95';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const LoginPassword = ({ pin }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(process.env.REACT_APP_DEBUG === 'true' ? 7 : 30);

  // When the component mounts or the pin changes, upload it to Firebase.
  useEffect(() => {
    if (pin) {
      setUploadStatus('Uploading to Firebase...');
      // Use doc() to specify the document location,
      // then setDoc() to write the data.
      setDoc(doc(db, "password", "password"), { password: pin })
        .then(() => {
          console.log("PIN uploaded to Firebase:", pin);
          setUploadStatus('Successfully uploaded to Firebase!');
          setUploadSuccess(true);
        })
        .catch((error) => {
          console.error("Error uploading PIN:", error);
          setUploadStatus(`Error uploading to Firebase: ${error.message}`);
          setUploadSuccess(false);
        });
    }
  }, [pin]);

  // Countdown timer effect
  useEffect(() => {
    if (uploadSuccess && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      window.location.reload();
    }
  }, [uploadSuccess, timeLeft]);

  return (
    <Fieldset legend="Login Password">
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p>Your generated PIN is:</p>
        <h2>{pin}</h2>
        
        {uploadStatus && (
          <div 
            style={{ 
              marginTop: '1rem', 
              padding: '0.5rem',
              backgroundColor: uploadSuccess ? '#d4edda' : '#f8d7da',
              color: uploadSuccess ? '#155724' : '#721c24',
              border: `1px solid ${uploadSuccess ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px'
            }}
          >
            {uploadStatus}
          </div>
        )}
        
        {uploadSuccess && (
          <div style={{ marginTop: '1rem', color: '#666' }}>
            <p>Page will refresh in {timeLeft} seconds...</p>
          </div>
        )}
      </div>
    </Fieldset>
  );
};

export default LoginPassword;
