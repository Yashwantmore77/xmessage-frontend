import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import { Provider } from 'react-redux';
import * as process from 'process';
import ErrorBoundary from './Components/ErrorBoundary';

(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
