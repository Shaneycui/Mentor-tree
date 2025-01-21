import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Design from './pages/Design';
import Features from './pages/Features';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/design" element={<Design />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;