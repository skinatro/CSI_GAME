// src/components/NumberDisplay.js
import React, { useState } from 'react';
import { symbolMapping } from './symbols'; // Mapping of digit => symbol (URL or component)
import { Fieldset, Button } from 'react95';

const NumberDisplay = ({ numbers }) => {
  // Get the last 9 digits from the input numbers
  const digits = numbers.slice(-9);

  // Mapping function: renders a symbol from a digit
  const renderSymbol = (digit, index) => {
    const symbol = symbolMapping[digit];
    if (typeof symbol === 'string') {
      return (
        <img
          key={index}
          src={symbol}
          alt={`symbol for ${digit}`}
          style={{ width: 40, height: 40, margin: '0 4px' }}
        />
      );
    } else if (typeof symbol === 'function') {
      const SymbolComponent = symbol;
      return (
        <SymbolComponent
          key={index}
          style={{ width: 40, height: 40, margin: '0 4px' }}
        />
      );
    } else {
      return (
        <span key={index} style={{ margin: '0 4px' }}>
          {digit}
        </span>
      );
    }
  };

  // Expected password (as digits)
  const password = "012345678";
  // Map expected password to symbols
  const expectedSymbolDisplay = password.split('').map((digit, index) =>
    renderSymbol(digit, index)
  );
  // Map the input digits to symbols
  const symbolDisplay = digits.map((digit, index) => renderSymbol(digit, index));

  // State for the verification result message
  const [resultMessage, setResultMessage] = useState("");

  // Function to verify input against the expected password
  const verifyPassword = () => {
    const displayString = digits.join('');
    if (displayString.length !== 9) {
      setResultMessage("Password incomplete.");
    } else if (displayString === password) {
      setResultMessage("Password matched!");
    } else {
      setResultMessage("Password did not match.");
    }
  };

  return (
    <Fieldset legend="Number & Password">
      {process.env.REACT_APP_DEBUG === 'true' && (
        <div style={{ marginBottom: '1rem' }}>
          <p>Expected Password:</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0.5rem 0',
            }}
          >
            {expectedSymbolDisplay}
          </div>
        </div>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <p>Input:</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0.5rem 0',
          }}
        >
          {symbolDisplay}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Button onClick={verifyPassword}>Verify</Button>
      </div>
      <p>{resultMessage}</p>
    </Fieldset>
  );
};

export default NumberDisplay;
