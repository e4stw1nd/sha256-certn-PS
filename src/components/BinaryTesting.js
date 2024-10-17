import React, { useState } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

// List of blacklisted API calls
const blacklistedApiCalls = ['ShellExecuteW', 'InternetOpenUrlW', 'CreateProcessW', 'TerminateProcess', 'WriteProcessMemory', 'VirtualAlloc'];

// Simulated detected API calls including some blacklisted ones
const detectedApiCalls = [
  { pFile: '00001A00', data: '00003A20', description: 'Hint/Name RVA', value: 'GetModuleFileNameW' },
  { pFile: '00001A04', data: '00003A56', description: 'Hint/Name RVA', value: 'CloseHandle' },
  { pFile: '00001A08', data: '00003A44', description: 'Hint/Name RVA', value: 'CreateProcessW' },  // Blacklisted
  { pFile: '00001A10', data: '00003B10', description: 'Hint/Name RVA', value: 'TerminateProcess' }, // Blacklisted
  { pFile: '00001A14', data: '00003B56', description: 'Hint/Name RVA', value: 'IsProcessorFeaturePresent' },
  { pFile: '00001A18', data: '00003EC0', description: 'Hint/Name RVA', value: 'QueryPerformanceCounter' },
  { pFile: '00001A1C', data: '00003E76', description: 'Hint/Name RVA', value: 'ShellExecuteW' },    // Blacklisted
  { pFile: '00001A20', data: '00003E9A', description: 'Hint/Name RVA', value: 'InternetOpenA' },
  { pFile: '00001A24', data: '00003FA0', description: 'Hint/Name RVA', value: 'InternetOpenUrlW' },  // Blacklisted
];

// Simulate detection of secondary payloads
const detectedPayloads = ['Payload.exe', 'Downloader.dll'];

const SampleAnalysis = () => {
  const [sampleFile, setSampleFile] = useState(null);
  const [apiCalls, setApiCalls] = useState([]);
  const [payloads, setPayloads] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSampleFile(e.target.files[0]);
  };

  const handleAnalyzeSample = () => {
    if (!sampleFile) {
      setError('No sample file selected.');
      return;
    }

    // Clear any previous errors or results
    setError('');
    setApiCalls([]);
    setPayloads([]);

    // Simulate analyzing the sample and detecting API calls
    setApiCalls(detectedApiCalls);
    
    // Simulate detection of secondary payloads
    setPayloads(detectedPayloads);
  };

  return (
    <Container>
      <Typography variant="h4">Sample Analysis</Typography>

      {/* File Upload */}
      <input
        type="file"
        accept=".bin, .exe, .elf" // Allow binary file types
        onChange={handleFileChange}
        style={{ margin: '20px 0' }}
      />

      {/* Analyze Button */}
      <Button variant="contained" color="primary" onClick={handleAnalyzeSample}>
        Analyze Sample
      </Button>

      {/* Error Message */}
      {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}

      {/* API Call Analysis Results */}
      {apiCalls.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Typography variant="h6">Detected API Calls</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>pFile</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Value (API Call)</TableCell>
                <TableCell>Blacklisted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiCalls.map((api, index) => {
                const isBlacklisted = blacklistedApiCalls.includes(api.value);
                return (
                  <TableRow key={index}>
                    <TableCell>{api.pFile}</TableCell>
                    <TableCell>{api.data}</TableCell>
                    <TableCell>{api.description}</TableCell>
                    <TableCell>{api.value}</TableCell>
                    <TableCell style={{ color: isBlacklisted ? 'red' : 'green' }}>
                      {isBlacklisted ? 'Yes' : 'No'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Secondary Payload Detection */}
      {payloads.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Typography variant="h6">Detected Secondary Payloads</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payload Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payloads.map((payload, index) => (
                <TableRow key={index}>
                  <TableCell>{payload}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Additional Malware Analysis */}
      {apiCalls.length > 0 && (
        <Container style={{ marginTop: '20px' }}>
          <Typography variant="h6">Additional Malware Analysis</Typography>
          <ul>
            <li>Suspicious Persistence Mechanisms: Detected</li>
            <li>Encryption Routines: Not Detected</li>
            <li>Suspicious Network Connections: Detected</li>
            <li>Process Injection: Not Detected</li>
          </ul>
        </Container>
      )}
    </Container>
  );
};

export default SampleAnalysis;

