import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import App from './App';
import { Provider } from 'react-redux';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './context/AppContext';
import { QueryClient } from 'react-query'
import QueryClientProvider from './queries/Query';
import Loading from './pages/Loading/Loading';
import { spinningLoaderRef } from './pages/Loading/hook';
import IntlProvider from './context/IntlContext';
import { ModalProvider } from './ui/ConfirmModel/ModalContextCustom';
import { register } from './serviceWorker';

const Main = () => {
  const queryClient = new QueryClient()
  return (
    <Loading ref={spinningLoaderRef}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider>
          <AppProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
            <ToastContainer />
          </AppProvider>
        </IntlProvider>
      </QueryClientProvider>
    </Loading>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Main />

      </PersistGate>
    </Provider>

  </React.StrictMode>
)
register();