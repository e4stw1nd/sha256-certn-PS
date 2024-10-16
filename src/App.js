// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NetworkStats from './components/NetworkStats';
import WebAppTesting from './components/WebAppTesting';
import BinaryTesting from './components/BinaryTesting';
import { Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Cyber Sentinel
        </Typography>
        <Routes>
          <Route path="/network-stats" element={<NetworkStats />} />
          <Route path="/web-app-testing" element={<WebAppTesting />} />
          <Route path="/binary-testing" element={<BinaryTesting />} />
          <Route path="/" element={<Typography variant="h5" align="center">Select a feature from the menu above.</Typography>} />
        </Routes>
      </Container>
      <Footer />
      </div>
    </Router>
  );
}

export default App;

