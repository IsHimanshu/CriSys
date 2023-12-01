import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { FeedsContextProvider } from './context/FeedContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <FeedsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </FeedsContextProvider>
  </BrowserRouter>
);



