// src/components/NumberDisplay.js
import React from 'react';
import ColorCards from './ColorCards';
import { symbolMapping } from './symbols'; // Mapping of digit => symbol (URL or component)
import { Fieldset } from 'react95';

const NumberDisplay = ({ numbers }) => {
  // Get the last 9 digits from the input numbers
  const digits = numbers.slice(-9);

  // Mapping function: renders a symbol from a digit
  const renderSymbol = (digit, index) => {
    const symbol = symbolMapping[digit];
    if (typeof symbol === 'string') {
      // If symbol is a URL, render an <img>
      return (
        <img
          key={index}
          src={symbol}
          alt={`symbol for ${digit}`}
          style={{ width: 40, height: 40, margin: '0 4px' }}
        />
      );
    } else if (typeof symbol === 'function') {
      // If symbol is a React component, render it
      const SymbolComponent = symbol;
      return (
        <SymbolComponent
          key={index}
          style={{ width: 40, height: 40, margin: '0 4px' }}
        />
      );
    } else {
      // Fallback: render the digit as text
      return (
        <span key={index} style={{ margin: '0 4px' }}>
          {digit}
        </span>
      );
    }
  };

  // Expected password (as digits)
  const password = "012345678";
  // Convert the expected password into an array of digits and map to symbols
  const expectedSymbolDisplay = password.split('').map((digit, index) => renderSymbol(digit, index));

  // Map the input digits to symbols
  const symbolDisplay = digits.map((digit, index) => renderSymbol(digit, index));

  // Compare input to expected password (as string)
  const displayString = digits.join('');
  let resultMessage = "";
  if (displayString.length === 9) {
    resultMessage = displayString === password ? "Password matched!" : "Password did not match.";
  } else {
    resultMessage = "Password incomplete.";
  }

  return (
    <Fieldset legend="Number & Password">
      <div style={{ marginBottom: '1rem' }}>
        <p>Expected Password:</p>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
          {expectedSymbolDisplay}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <p>Input:</p>
        <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
          {symbolDisplay}
        </div>
      </div>
      <ColorCards />
      <p>{resultMessage}</p>
    </Fieldset>
  );
};

export default NumberDisplay;
