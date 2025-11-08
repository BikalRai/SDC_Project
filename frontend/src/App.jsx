import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import Verification from "./pages/VerificationPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/complete-profile' element={<CompleteProfile />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/landing' element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
