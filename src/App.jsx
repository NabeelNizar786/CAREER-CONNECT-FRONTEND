import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage'
import Login from './pages/user/Login';
import Register from './pages/user/Register'

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
