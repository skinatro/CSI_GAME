// src/hooks/useNumbers.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useNumbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [isCleared, setIsCleared] = useState(false);

  const clearNumbers = async () => {
    try {
      // Call the server's clear endpoint
      await axios.post('http://localhost:3050/clear');
      setNumbers([]);
      setIsCleared(true);
      // Reset the cleared state after 0.1 seconds to allow new numbers to come in
      setTimeout(() => {
        setIsCleared(false);
      }, 100);
    } catch (err) {
      console.error('Error clearing numbers:', err);
      setError('Failed to clear numbers');
    }
  };

  useEffect(() => {
    const fetchNumbers = async () => {
      // Don't fetch if numbers were just cleared
      if (isCleared) {
        return;
      }

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
    const intervalId = setInterval(fetchNumbers, 100);
    return () => clearInterval(intervalId);
  }, [isFirstLoad, isCleared]);

  return { numbers, loading, error, clearNumbers };
};

export default useNumbers;
