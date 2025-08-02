import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Make sure App.js is deleted if App.jsx exists

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
    <App />
  //</React.StrictMode>
);