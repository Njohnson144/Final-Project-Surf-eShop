import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Nav from './components/nav/Nav';
import LogInPage from './components/login/LogInPage';
// import ProductPage from './components/ProductPage';
import SignUpPage from './components/login/SignUpPage';
import OrderConfirmPage from './components/OrderConfirmPage';
import { ToastProvider } from './services/toasts/toastService'
import ShoppingCart from './components/ShoppingCart'
import Homepage from './components/Homepage';
import PastOrders from './components/PastOrders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
