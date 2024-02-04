import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from './Components/UsersList.js';
import Nav from './Components/Nav.js';
import CreateUser from './Components/CreateUser.js';
import EditUser from './Components/EditUser.js';
import './App.css';
import Footer from './Components/Footer.js';


function App() {
  return (
    <div>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={< UsersList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/delete/:id" element={<CreateUser />} />{" "}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;


