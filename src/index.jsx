// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Reset CSS to ensure consistent styling across browsers
const resetCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }
  
  button {
    font-family: inherit;
  }
`;

// Create style element
const style = document.createElement('style');
style.textContent = resetCSS;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);