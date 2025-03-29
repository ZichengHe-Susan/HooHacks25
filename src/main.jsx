import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './css/index.css';
import AppRoutes from './Routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
