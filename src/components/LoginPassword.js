// src/components/LoginPassword.js
import React from 'react';
import { Fieldset} from 'react95';

const LoginPassword = ({ pin }) => {
  return (
    <Fieldset legend="Login Password">
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p>Your generated PIN is:</p>
        <h2>{pin}</h2>
      </div>
    </Fieldset>
  );
};

export default LoginPassword;
