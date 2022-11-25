import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Frame from './pages/Frame';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { CookiesProvider } from 'react-cookie';

const theme = createTheme({
  palette: {
    primary: {
      main: "#D046D2",
    },
  },
  breakpoints: {
    values: {
      m: 0,
      t: 640,
      l: 1024,
      d: 1200,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode는 개발 버전에서만 적용되는 모드로, 여러 부분에서 검사를 해주는 모드
  // StrincMode를 켜면 unmount 되는 현상 발생
  // https://ko.reactjs.org/docs/strict-mode.html

  <ThemeProvider theme={theme}>
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path='/*' element={<Frame />} />
        </Routes>
      </Router>
    </CookiesProvider>
  </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();