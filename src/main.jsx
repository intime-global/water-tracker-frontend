// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { perStore, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { setupInterceptors } from './services/axios.config.js';

setupInterceptors(perStore);
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={perStore}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  // </StrictMode>,
);
