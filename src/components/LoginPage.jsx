import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Assuming this is the correct path to your Firebase config

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Function to handle login
    const handleLogin = async (event) => {
      event.preventDefault();
      
      try {
        // Reference to the document in the 'password' collection
        const passwordDocRef = doc(db, 'password', 'password');
        const passwordDoc = await getDoc(passwordDocRef);
        
        if (passwordDoc.exists()) {
          const storedPassword = passwordDoc.data().password;
  
          // Check if the entered password matches the stored password
          if (password === storedPassword) {
            setIsAuthenticated(true);
            setErrorMessage('');
          } else {
            setIsAuthenticated(false);
            setErrorMessage('Incorrect password');
          }
        } else {
          setErrorMessage('Password document not found');
        }
      } catch (error) {
        console.error('Error fetching password:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        {isAuthenticated && <p>Welcome! You are logged in.</p>}
      </div>
    );
  };
  
  export default LoginPage;