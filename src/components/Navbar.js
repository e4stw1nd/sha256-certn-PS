// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/cyber-sentinel-logo.png'; // Importing the logo
import './Navbar.css';  // For navbar specific styles

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Cyber Sentinel Logo" className="logo" />
          <Typography variant="h6" className="title">
            Cyber Sentinel
          </Typography>
        </Box>
        <div className="nav-links">
          <Link to="/network-stats" className="nav-link">Network Stats</Link>
          <Link to="/web-app-testing" className="nav-link">Web App Testing</Link>
          <Link to="/binary-testing" className="nav-link">Binary Testing</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

