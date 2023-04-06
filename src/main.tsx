import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/Application';
import '@/theme/index.css';

const rootDOM = document.getElementById('root') as HTMLElement;
const rootElement = ReactDOM.createRoot(rootDOM);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
