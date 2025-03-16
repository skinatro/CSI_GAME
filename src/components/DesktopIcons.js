// src/components/DesktopIcons.js
import React from 'react';
import './DesktopIcons.css';

const DesktopIcons = () => {
  return (
    <div className="desktop-icons">
      <div className="desktop-icon">
        <span role="img" aria-label="computer" style={{ fontSize: '2rem' }}>💻</span>
        <span>My Computer</span>
      </div>
      <div className="desktop-icon">
        <span role="img" aria-label="recycle bin" style={{ fontSize: '2rem' }}>🗑️</span>
        <span>Recycle Bin</span>
      </div>
    </div>
  );
};

export default DesktopIcons;
