import React from 'react';
import './App.css';
import Header from './components/Header';
import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import NumberDisplay from './components/NumberDisplay';
import useNumbers from './hooks/useNumbers';

function App() {
  const { numbers, loading, error } = useNumbers();

  return (
    <div className="App">
      <Header />
      <main className="App-content">
        {loading && <LoadingMessage />}
        {error && <ErrorMessage message={error} />}
        <div className="numbers-container">
          <h2>Received Numbers</h2>
          {/* The NumberDisplay now handles concatenation and password checking */}
          <NumberDisplay numbers={numbers} />
        </div>
      </main>
    </div>
  );
}

export default App;
