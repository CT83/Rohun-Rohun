import React from 'react';
import './App.css';
import Listener from './Listener';


const App = () => {
  return (
    <div className="app">
      <header>
        <h1>🦇 The Listener</h1>
      </header>
      <main>

        <Listener/>

      </main>
    <footer>
      <p>
        Made with{' '}
        <span role="img" aria-label="React">
          ⚛
          </span>{' '}
          by <a href="https://twitter.com/_Rohan_Sawant_">Rohan Sawant</a>
      </p>
    </footer>
    </div >
  );
};

export default App;