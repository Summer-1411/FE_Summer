import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <App />
          <ToastContainer />
        </AppProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
