import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Bringing in the GoogleOAuthProvider from the package
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <GoogleOAuthProvider clientId="201331859199-tj4sfe8ddlq0vfinq7ogrpvp0jhbmt8k.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

