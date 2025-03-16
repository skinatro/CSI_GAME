import { useState, useEffect } from 'react';
import axios from 'axios';

const useNumbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch numbers from the server
    const fetchNumbers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3050/numbers');
        // Only store the last 9 numbers
        const trimmedNumbers = response.data.slice(-9);
        setNumbers(trimmedNumbers);
        setError(null);
      } catch (err) {
        setError('Failed to fetch numbers from server');
        console.error('Error fetching numbers:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch and set up polling every 5 seconds
    fetchNumbers();
    const intervalId = setInterval(fetchNumbers, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return { numbers, loading, error };
};

export default useNumbers;
