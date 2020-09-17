import * as React from 'react';
import ReactDOM from 'react-dom';
import config from '@base86inc/apollo-client/build/firebase.config';
import { initializeApp } from 'firebase/app';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Base86Provider } from './client';
import { ToastProvider } from './components/Toast';
import App from './App';
import 'firebase/auth';
import './assets/styles/index.css';
import theme from './assets/theme';

initializeApp(config);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Base86Provider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </Base86Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
