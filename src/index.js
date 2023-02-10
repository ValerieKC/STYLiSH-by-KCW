import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from './App';
import Home from './pages/Home/Home'
import Product from "./pages/Product/Product"
import Checkout from "./pages/Checkout/Checkout";
import ThankYou from "./pages/ThankYou/ThankYou";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);


