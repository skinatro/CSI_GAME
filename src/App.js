import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch numbers from server
    const fetchNumbers = async () => {
      setLoading(true);
      try {
        // Replace with your actual server endpoint
        const response = await axios.get('http://localhost:3050/numbers');
        setNumbers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch numbers from server');
        console.error('Error fetching numbers:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNumbers();

    // Set up polling every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchNumbers, 5000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Display</h1>
      </header>
      <main className="App-content">
        {loading && <p className="loading-message">Loading numbers...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className="numbers-container">
          <h2>Received Numbers</h2>
          {numbers.length === 0 && !loading ? (
            <p>No numbers received yet</p>
          ) : (
            <ul className="number-list">
              {numbers.map((number, index) => (
                <li key={index} className="number-item">{number}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
