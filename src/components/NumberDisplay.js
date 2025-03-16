import React from 'react';

const NumberDisplay = ({ numbers }) => {
  // Concatenate only the last 9 numbers into a string
  const displayString = numbers.slice(-9).join('');
  const password = "012345678";

  // Determine the result message based on the length and match of the displayString
  let resultMessage = "";
  if (displayString.length === 9) {
    resultMessage = displayString === password 
      ? "Password matched!" 
      : "Password did not match.";
  } else {
    resultMessage = "Password incomplete.";
  }

  return (
    <div>
      <p className="password-target">
        Expected Password: <strong>{password}</strong>
      </p>
      <p className="number-display">
        Input: <strong>{displayString}</strong>
      </p>
      <p className="password-result">{resultMessage}</p>
    </div>
  );
};

export default NumberDisplay;
