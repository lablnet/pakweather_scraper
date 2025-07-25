import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './style/index.css';
import NewApp from './pages/NewApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NewApp />
    </BrowserRouter>
  </React.StrictMode>
);
