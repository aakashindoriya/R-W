// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/LoginUser';
import Signup from './components/RegisterUser';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/shop" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </Router>
  );
};

export default App;
