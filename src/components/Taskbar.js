// src/components/Taskbar.js
import React from 'react';
import { Panel, Button } from 'react95';
import './Taskbar.css';

const Taskbar = () => {
  return (
    <Panel className="taskbar" variant="raised">
      <Button size="sm" style={{ margin: '0 0.5rem' }}>
        {/* Replace the emoji with an image if preferred */}
        <span role="img" aria-label="start">🗔</span> Start
      </Button>
      <div className="taskbar-icons">
        <Button size="sm" style={{ margin: '0 0.5rem' }}>My Computer</Button>
        <Button size="sm" style={{ margin: '0 0.5rem' }}>Recycle Bin</Button>
      </div>
    </Panel>
  );
};

export default Taskbar;
