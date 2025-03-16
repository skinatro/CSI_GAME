import React from 'react';

const NumberList = ({ numbers }) => {
  if (!numbers || numbers.length === 0) {
    return <p>No numbers received yet</p>;
  }

  return (
    <ul className="number-list">
      {numbers.map((number, index) => (
        <li key={index} className="number-item">
          {number}
        </li>
      ))}
    </ul>
  );
};

export default NumberList;
