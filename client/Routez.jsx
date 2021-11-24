import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import Main from './components/Main.jsx';

export default function Routez() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/maincontainer" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
