// src/App.js
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95/dist/themes';
import { Window, WindowHeader, WindowContent } from 'react95';
import Header from './components/Header';
import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import NumberDisplay from './components/NumberDisplay';
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
  const { numbers, loading, error } = useNumbers();

  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <div className="App">
        <Window style={{ width: 600, margin: '0 auto' }}>
          <WindowHeader noStart>
            <span style={{ fontWeight: 'bold' }}>Game</span>
          </WindowHeader>
          <WindowContent>
            <Header />
            {/* Only show the loading indicator if no numbers have been loaded yet */}
            {loading && numbers.length === 0 && <LoadingMessage />}
            {error && <ErrorMessage message={error} />}
            <NumberDisplay numbers={numbers} />
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default App;
