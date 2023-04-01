import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './../pages/Home';
import FruitDetails from '../pages/FruitDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import Thankyou from './../pages/Thankyou';
import Fruits from './../pages/Fruits';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="/fruits/:id" element={<FruitDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<Thankyou />} />

      <Route path="/fruits/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
