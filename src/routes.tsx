import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import User from './pages/User/Users';
import UserDetails from './pages/UserDetails/UserDetails';

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;