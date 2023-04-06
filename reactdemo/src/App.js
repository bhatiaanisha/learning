import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import { setCurrentUser } from './services/LoginService';
import Admin from './components/admin/Admin';

export default function App() {

  useEffect(()=> {
    setcurrentUser();
  });

  function setcurrentUser(){
    let data = localStorage.getItem("token");
    if(data)
    {
      const Token = JSON.parse(data);
      setCurrentUser(Token);
    }
    else
    {
      setCurrentUser();
    }
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/products/:productId" element={<ProductDetail />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes> 
    </div>
  );
}
