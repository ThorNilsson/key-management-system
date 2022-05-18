import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"

import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
      fontWeight: 700,
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
    },
    h3: {
      fontSize: 20,
      fontWeight: 500,
    },
    h4: {
      fontSize: 18,
      fontWeight: 500,
    },
    h5: {
      fontSize: 16,
      fontWeight: 500,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
    },
    subtitle1: "h2",
    subtitle2: "h2",
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
