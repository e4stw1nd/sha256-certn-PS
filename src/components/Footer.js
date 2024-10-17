// src/components/Footer.js
import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Container style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 Cyber Sentinel. All Rights Reserved.
      </Typography>
    </Container>
  );
};

export default Footer;

