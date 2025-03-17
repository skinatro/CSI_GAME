// src/components/NumberDisplay.js
import React, { useState } from 'react';
import { symbolMapping } from './symbols';
import { Fieldset, Button } from 'react95';

const NumberDisplay = ({ numbers, onSolved, password }) => {
  const digits = numbers.slice(-9);
  const [resultMessage, setResultMessage] = useState("");

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

  const expectedPassword = password || '';
  const expectedSymbolDisplay = password ? 
    expectedPassword.split('').map((digit, index) => renderSymbol(digit, index)) : 
    <span>No password available yet</span>;
    
  const symbolDisplay = digits.map((digit, index) => renderSymbol(digit, index));

  const verifyPassword = () => {
    if (!expectedPassword) {
      setResultMessage("No password to verify against. Complete the shuffling game first.");
      return;
    }
    
    const displayString = digits.join('');
    if (displayString.length !== 9) {
      setResultMessage("Password incomplete.");
    } else if (displayString === expectedPassword) {
      setResultMessage("Password matched!");
      if (onSolved) onSolved();
    } else {
      setResultMessage("Password did not match.");
    }
  };

  return (
    <Fieldset legend="Number Display">
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p>Expected Password Display:</p>
        <div style={{ margin: '1rem 0' }}>
          {expectedSymbolDisplay}
        </div>
        <p>Current Display:</p>
        <div style={{ margin: '1rem 0' }}>
          {symbolDisplay}
        </div>
        <Button onClick={verifyPassword}>
          Verify Password
        </Button>
        {resultMessage && (
          <div style={{ marginTop: '1rem', color: resultMessage.includes("matched") ? 'green' : 'red' }}>
            {resultMessage}
          </div>
        )}
      </div>
    </Fieldset>
  );
};

export default NumberDisplay;
