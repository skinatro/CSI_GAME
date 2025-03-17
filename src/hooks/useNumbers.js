// src/hooks/useNumbers.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useNumbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNumbers = async () => {
      // Only set loading true during the first load
      if (isFirstLoad) {
        setLoading(true);
      }
      try {
        const response = await axios.get('http://localhost:3050/numbers');
        const trimmedNumbers = response.data.slice(-9);
        setNumbers(trimmedNumbers);
        setError(null);
      } catch (err) {
        setError('Failed to fetch numbers from server');
        console.error('Error fetching numbers:', err);
      } finally {
        // On first load, mark as complete
        if (isFirstLoad) {
          setIsFirstLoad(false);
        }
        setLoading(false);
      }
    };

    fetchNumbers();
    const intervalId = setInterval(fetchNumbers, 500);
    return () => clearInterval(intervalId);
  }, [isFirstLoad]);

  return { numbers, loading, error };
};

export default useNumbers;
