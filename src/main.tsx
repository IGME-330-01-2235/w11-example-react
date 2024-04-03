import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './reset.css';

// Initialize React, having it render into the #root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode gives us extra development-only checks. It is transparent when built for production.
  <React.StrictMode>
    {/* App is our root/starter/main component. */}
    <App />
  </React.StrictMode>,
);
