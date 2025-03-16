// src/components/ErrorMessage.js
import React from 'react';
import { Panel } from 'react95';

const ErrorMessage = ({ message }) => (
  <Panel
    style={{
      padding: '0.5rem',
      margin: '1rem 0',
      backgroundColor: '#f08080',
      color: '#000',
      textAlign: 'center'
    }}
  >
    {message}
  </Panel>
);

export default ErrorMessage;
