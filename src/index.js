import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ This is the required import
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
