// src/components/LoginPassword.js
import React, { useState, useEffect } from 'react';
import { Fieldset, Button, TextField } from 'react95';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const LoginPassword = ({ pin }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (pin) {
      setUploadStatus('Uploading to Firebase...');
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
          <div style={{ marginTop: '1rem' }}>
            <Button 
              onClick={() => {
                console.log("Testing Firebase connection...");
                setDoc(doc(db, "test", "ping"), { timestamp: new Date().toISOString() })
                  .then(() => alert("Firebase connection works!"))
                  .catch(err => alert(`Firebase error: ${err.message}`));
              }}
            >
              Test Firebase Connection
            </Button>
          </div>
        )}
      </div>
    </Fieldset>
  );
};

export default LoginPassword;
