import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';

import './styles/index.css';
import { App } from './components';
import {AuthProvider} from './providers/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* // ToastProvider will be using the context APi so we wrap it arroud App */}
    {/* Context API is nothing but pop up messages used by Toast provider */}
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
        <App />
      </AuthProvider> 
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
