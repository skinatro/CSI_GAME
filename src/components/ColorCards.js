// src/components/ColorCards.js
import React, { useMemo } from 'react';
import './ColorCards.css';

const ColorCards = () => {
  const colors = [
    { name: 'Red', rgb: 'rgb(255, 0, 0)' },
    { name: 'Green', rgb: 'rgb(0, 255, 0)' },
    { name: 'Blue', rgb: 'rgb(0, 0, 255)' }
  ];

  // Shuffle the colors array only once when the component mounts
  const shuffledColors = useMemo(() => {
    const arr = [...colors];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div className="color-cards">
      {shuffledColors.map((color, index) => (
        <div
          key={index}
          className="color-card"
          style={{ backgroundColor: color.rgb }}
        >
          <p>{color.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ColorCards;
