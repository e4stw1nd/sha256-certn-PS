// src/components/BinaryTesting.js
import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';

const BinaryTesting = () => {
  const [binaryFile, setBinaryFile] = useState(null);

  const handleFileChange = (e) => {
    setBinaryFile(e.target.files[0]);
  };

  const handleFileSubmit = () => {
    if (binaryFile) {
      console.log('Testing binary:', binaryFile.name);
      // Logic to process binary file (upload or run tests)
    } else {
      console.error('No binary file selected');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Binary Testing</Typography>
      <input
        type="file"
        accept=".bin, .exe, .elf" // Change based on what binary file types you want to allow
        onChange={handleFileChange}
        style={{ margin: '20px 0' }}
      />
      <Button variant="contained" color="primary" onClick={handleFileSubmit}>
        Test Binary
      </Button>
    </Container>
  );
};

export default BinaryTesting;

