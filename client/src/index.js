import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
); 