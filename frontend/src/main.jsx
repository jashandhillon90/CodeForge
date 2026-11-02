import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#151E29',
              color: '#F1F5F9',
              border: '1px solid #263241',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              iconTheme: { primary: '#22C55E', secondary: '#151E29' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#151E29' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

