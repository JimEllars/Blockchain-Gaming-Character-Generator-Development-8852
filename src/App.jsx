import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import CharacterCreator from './pages/CharacterCreator';
import Gallery from './pages/Gallery';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cloud text-forest relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-b from-cloud-light via-pastel-blue/5 to-pastel-purple/5 pointer-events-none" />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CharacterCreator />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;