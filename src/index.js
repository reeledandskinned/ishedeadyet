// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';                 // <- must include .js
import './App.css';
import reportWebVitals from './reportWebVitals.js';  // <- must include .js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();