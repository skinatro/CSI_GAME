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
import useNumbers from './hooks/useNumbers';
import './App.css';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  body {
    font-family: 'MS Sans Serif', Tahoma, Geneva, Verdana, sans-serif;
    background: teal;
    padding: 20px;
  }
`;

function App() {
  // State to determine which view is active: "shuffling" or "number"
  const [currentScreen, setCurrentScreen] = useState("shuffling");
  // For NumberDisplay view
  const { numbers, loading, error } = useNumbers();

  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <div className="App">
        <Window style={{ width: 600, margin: '0 auto' }}>
          <WindowHeader noStart>
            <span style={{ fontWeight: 'bold' }}>
              {currentScreen === "shuffling" ? "Card Shuffling Game" : "Number Display Game"}
            </span>
          </WindowHeader>
          <WindowContent>
            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Button onClick={() => setCurrentScreen("shuffling")}>
                Shuffling Game
              </Button>
              <Button onClick={() => setCurrentScreen("number")}>
                Number Display
              </Button>
            </div>

            {/* Render view based on currentScreen */}
            {currentScreen === "shuffling" ? (
              <ShufflingGame />
            ) : (
              <>
                <Header />
                {loading && numbers.length === 0 && <LoadingMessage />}
                {error && <ErrorMessage message={error} />}
                <NumberDisplay numbers={numbers} />
              </>
            )}
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default App;
