// src/components/LoadingMessage.js
import React from 'react';
import { Panel } from 'react95';

const LoadingMessage = () => (
  <Panel
    style={{
      padding: '0.5rem',
      margin: '1rem 0',
      backgroundColor: '#c0c0c0',
      textAlign: 'center'
    }}
  >
    Loading numbers...
  </Panel>
);

export default LoadingMessage;
