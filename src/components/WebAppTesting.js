// src/components/WebAppTesting.js
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
} from '@mui/material';

const WebAppTesting = () => {
  const [url, setUrl] = useState('');
  const [scanOptions, setScanOptions] = useState({
    brokenAccessControl: true,
    cryptographicFailures: true,
    injection: true,
    insecureDesign: true,
    securityMisconfiguration: true,
    outdatedComponents: true,
    authFailures: true,
    integrityFailures: true,
    loggingFailures: true,
    ssrf: true,
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const validateUrl = (inputUrl) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '(([\\da-z.-]+)\\.([a-z.]{2,6})|' + // domain name and extension
        '([\\d.]+))' + // OR ip (v4) address
        '(\\:[0-9]{1,5})?' + // port
        '(\\/[\\w\\d%-_.~+]*)*' + // path
        '(\\?[;&\\w\\d%-_.~+=]*)?' + // query string
        '(\\#[-\\w\\d_]*)?$',
      'i'
    );
    return urlPattern.test(inputUrl);
  };

  const handleOptionChange = (event) => {
    setScanOptions({
      ...scanOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleUrlSubmit = async () => {
    setError(null);
    setScanResults(null);
    setDetailsVisible(false);

    if (!validateUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    const selectedOptions = Object.values(scanOptions).some((option) => option);
    if (!selectedOptions) {
      setError('Please select at least one scan option.');
      return;
    }

    setIsScanning(true);

    try {
      // Simulate an API call to start the scan
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock scan results
      const results = {
        url: url,
        vulnerabilities: [
          scanOptions.brokenAccessControl && { type: 'Broken Access Control', found: true, details: "Details about access control issues..." },
          scanOptions.cryptographicFailures && { type: 'Cryptographic Failures', found: false, details: null },
          scanOptions.injection && { type: 'Injection', found: true, details: "Details about injection vulnerabilities..." },
          scanOptions.insecureDesign && { type: 'Insecure Design', found: false, details: null },
          scanOptions.securityMisconfiguration && { type: 'Security Misconfiguration', found: true, details: "Details about misconfiguration..." },
          scanOptions.outdatedComponents && { type: 'Vulnerable and Outdated Components', found: false, details: null },
          scanOptions.authFailures && { type: 'Identification and Authentication Failures', found: true, details: "Details about authentication issues..." },
          scanOptions.integrityFailures && { type: 'Software and Data Integrity Failures', found: false, details: null },
          scanOptions.loggingFailures && { type: 'Security Logging and Monitoring Failures', found: true, details: "Details about logging issues..." },
          scanOptions.ssrf && { type: 'Server-Side Request Forgery (SSRF)', found: true, details: "Details about SSRF vulnerabilities..." },
        ].filter(Boolean),
      };

      setScanResults(results);
    } catch (err) {
      setError('An error occurred while scanning. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Web Application Testing
      </Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        placeholder="https://example.com"
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.brokenAccessControl}
              onChange={handleOptionChange}
              name="brokenAccessControl"
              color="primary"
            />
          }
          label="Broken Access Control"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.cryptographicFailures}
              onChange={handleOptionChange}
              name="cryptographicFailures"
              color="primary"
            />
          }
          label="Cryptographic Failures"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.injection}
              onChange={handleOptionChange}
              name="injection"
              color="primary"
            />
          }
          label="Injection"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.insecureDesign}
              onChange={handleOptionChange}
              name="insecureDesign"
              color="primary"
            />
          }
          label="Insecure Design"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.securityMisconfiguration}
              onChange={handleOptionChange}
              name="securityMisconfiguration"
              color="primary"
            />
          }
          label="Security Misconfiguration"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.outdatedComponents}
              onChange={handleOptionChange}
              name="outdatedComponents"
              color="primary"
            />
          }
          label="Vulnerable and Outdated Components"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.authFailures}
              onChange={handleOptionChange}
              name="authFailures"
              color="primary"
            />
          }
          label="Identification and Authentication Failures"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.integrityFailures}
              onChange={handleOptionChange}
              name="integrityFailures"
              color="primary"
            />
          }
          label="Software and Data Integrity Failures"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.loggingFailures}
              onChange={handleOptionChange}
              name="loggingFailures"
              color="primary"
            />
          }
          label="Security Logging and Monitoring Failures"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={scanOptions.ssrf}
              onChange={handleOptionChange}
              name="ssrf"
              color="primary"
            />
          }
          label="Server-Side Request Forgery (SSRF)"
        />
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUrlSubmit}
        disabled={isScanning}
        style={{ marginTop: '1rem' }}
      >
        {isScanning ? 'Scanning...' : 'Start Scan'}
      </Button>

      {isScanning && (
        <div style={{ marginTop: '1rem' }}>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: '0.5rem' }}>
            Scanning in progress...
          </Typography>
        </div>
      )}

      {error && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}

      {scanResults && (
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h5">Scan Results for {scanResults.url}</Typography>
          {scanResults.vulnerabilities.map((vuln, index) => (
            <Alert
              key={index}
              severity={vuln.found ? 'error' : 'success'}
              style={{ marginTop: '1rem' }}
            >
              {vuln.type}: {vuln.found ? 'Vulnerability Found' : 'No Issues Detected'}
            </Alert>
          ))}

          {scanResults.vulnerabilities.some((vuln) => vuln.found) && (
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleDetails}
              style={{ marginTop: '1rem' }}
            >
              {detailsVisible ? 'Hide Details' : 'View Details'}
            </Button>
          )}

          {detailsVisible && (
            <div style={{ marginTop: '1rem' }}>
              {scanResults.vulnerabilities.map(
                (vuln, index) =>
                  vuln.found && (
                    <Alert key={index} severity="info" style={{ marginTop: '1rem' }}>
                      {vuln.details}
                    </Alert>
                  )
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default WebAppTesting;

