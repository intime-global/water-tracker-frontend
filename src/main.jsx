import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { perStore, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider perStore={perStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="water-tracker-frontend">
        <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
