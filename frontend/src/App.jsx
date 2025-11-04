import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Index from './pages/index'
import Profile from './pages/Profile'
import CompleteProfile from './pages/completeProfile'
import Verification from './pages/verificationPage'
import LandingPage from './pages/landingPage'

const App = () => {
  return (
    <Router>
          <Routes>
            {/* Public routes */}
            {/* <Route path="/" element={<Index />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/" element={<LandingPage />} />

          </Routes>
        </Router>
  )
}

export default App
