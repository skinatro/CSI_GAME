// src/App.js
import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95/dist/themes';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import Header from './components/Header';
import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import NumberDisplay from './components/NumberDisplay';
import ShufflingGame from './components/ShufflingGame';
import LoginPassword from './components/LoginPassword';
import useNumbers from './hooks/useNumbers';
import './App.css';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    font-family: 'MS Sans Serif', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px;
  }
`;

function App() {
  // Stage can be "shuffling", "number", or "login"
  const [stage, setStage] = useState("shuffling");
  const { numbers, loading, error, clearNumbers } = useNumbers();
  // Holds the generated 4-digit PIN (initially null)
  const [generatedPin, setGeneratedPin] = useState(null);
  // Store the password from ShufflingGame
  const [shufflingPassword, setShufflingPassword] = useState(null);

  // When shuffling game is solved, move to "number" stage and store the password.
  const handleShufflingSolved = (password) => {
    setShufflingPassword(password);
    setStage("number");
    // Clear numbers when new password is generated
    clearNumbers();
  };

  // When number display is verified, generate a 4-digit PIN and move to "login" stage.
  const handleNumberDisplaySolved = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPin(pin);
    setStage("login");
  };

  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <div className="App">
        <Window style={{ width: 600, margin: '0 auto' }}>
          <WindowHeader noStart>
            <span style={{ fontWeight: 'bold' }}>
              {stage === "shuffling"
                ? "Card Shuffling Game"
                : stage === "number"
                ? "Number Display Game"
                : "Login Password"}
            </span>
          </WindowHeader>
          <WindowContent>
            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Button
                onClick={() => setStage("shuffling")}
                // Always enabled—this is the starting stage
              >
                Shuffling Game
              </Button>
              <Button
                onClick={() => setStage("number")}
                disabled={!shufflingPassword}
                style={{ opacity: !shufflingPassword ? 0.5 : 1 }}
              >
                Number Display
              </Button>
              <Button
                onClick={() => setStage("login")}
                disabled={stage !== "login"}
                style={{ opacity: stage !== "login" ? 0.5 : 1 }}
              >
                Login Password
              </Button>
            </div>

            {/* Render the current stage view */}
            {stage === "shuffling" && (
              <ShufflingGame onSolved={handleShufflingSolved} />
            )}
            {stage === "number" && (
              <>
                <Header />
                {loading && numbers.length === 0 && <LoadingMessage />}
                {error && <ErrorMessage message={error} />}
                <NumberDisplay 
                  numbers={numbers} 
                  onSolved={handleNumberDisplaySolved}
                  password={shufflingPassword}
                  clearNumbers={clearNumbers}
                />
              </>
            )}
            {stage === "login" && (
              <LoginPassword pin={generatedPin} />
            )}
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default App;
