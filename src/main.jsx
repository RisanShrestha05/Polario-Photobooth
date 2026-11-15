import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { CurtainProvider } from './components/landing/CurtainTransition.jsx';
import { BoothProvider } from './context/BoothContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './styles/tokens.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <BoothProvider>
          <CurtainProvider>
            <App />
          </CurtainProvider>
        </BoothProvider>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>,
);
