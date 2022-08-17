import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';

import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Cart from './components/Cart.js';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';

import Products from './pages/Products';
import ProductView from './components/ProductView';

import AdminPage from './pages/AdminPage';
import AddProduct from './components/Admin/AddProduct';
import AllProducts from './components/Admin/AllProducts';
import AllOrders from './components/Admin/AllOrders';

import './App.css';

export default function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch('https://obscure-everglades-49200.herokuapp.com/users/details', {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => res.json ())
    .then(data => {
      if(typeof data._id !== 'undefined') {
        setUser({ id: data._id, isAdmin: data.isAdmin});
      } else {
        setUser({id: null, isAdmin: null})
      }
    })
  }, [])

  return (
    <div style={{ fontFamily: 'Bitter' }}>
          <UserProvider value={{user, setUser, unsetUser}}>
            <Router>
              <AppNavbar />
                <Container>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Error />} />

                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<ProductView />} />

                    <Route path="/admin" element={<AdminPage/>} />
                    <Route path="/products/addProduct" element={<AddProduct/>} />
                    <Route path="/products/all" element={<AllProducts/>} />
                    <Route path="/users/orders" element={<AllOrders/>} />

                    <Route path="/cart" element={<Cart/>} />

                  </Routes>
                </Container>
              <Footer />
            </Router>
          </UserProvider>
    </div>
    
  );
}