import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import User from './components/User';
import ExitUser from './components/ExitUser';


export const config = {
  // endpoint: `http://localhost:8080/api`,
  endpoint: `https://xexit-backend-a033.onrender.com`,
};


function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav> */}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/exitUser" element={<ExitUser />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

