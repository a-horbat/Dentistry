import * as React from "react";
import ReactDOM from "react-dom";
import config from "@base86inc/apollo-client/build/firebase.config";
import { initializeApp } from "firebase/app";
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline
} from "@material-ui/core";
import { Base86Provider } from "./client";
import { ToastProvider } from "./components/Toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "firebase/auth";
import "./index.css";

initializeApp(config);

const theme = createMuiTheme({
  typography: {
    root: {
      color: '#333333',
    },
    h6: {
      color: '#333333',
    },
  },
  palette: {
    primary: {
      main: "#21C5C4",
      contrastText: "#fff"
    },
    secondary: {
      main: "#FF8070",
      contrastText: "#fff"
    },
    secondaryText: "#bdbdbd"
  }
});

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
  document.getElementById("root")
);
