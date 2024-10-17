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
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomCVSS = () => {
  return (Math.random() * (10 - 1) + 1).toFixed(1); // Random score between 1.0 to 10.0
};

const getRiskLevel = (cvssScore) => {
  if (cvssScore < 4.0) return 'Low';
  if (cvssScore >= 4.0 && cvssScore < 7.0) return 'Medium';
  return 'High';
};

const WebAppTesting = () => {
  const [url, setUrl] = useState('');
  const [scanOptions, setScanOptions] = useState({
    BrokenAccessControl: true,
    Injection: true,
    InsecureDesign: true,
    SecurityMisconfiguration: true,
    OutdatedComponents: true,
    AuthFailures: true,
    IntegrityFailures: true,
    LoggingFailures: true,
    SSRF: true,
    SqlInjection: true,
    XSS: true,
    BufferOverflow: true,
    InsecureDeserialization: true,
    SensitiveDataExposure: true,
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

      // Dummy vulnerabilities data generation
      const results = {
        url: url,
        vulnerabilities: [
          scanOptions.brokenAccessControl && { type: 'Broken Access Control', found: true },
          scanOptions.injection && { type: 'Injection', found: true },
          scanOptions.insecureDesign && { type: 'Insecure Design', found: false },
          scanOptions.securityMisconfiguration && { type: 'Security Misconfiguration', found: true },
          scanOptions.outdatedComponents && { type: 'Vulnerable and Outdated Components', found: true },
          scanOptions.authFailures && { type: 'Identification and Authentication Failures', found: true },
          scanOptions.integrityFailures && { type: 'Software and Data Integrity Failures', found: false },
          scanOptions.loggingFailures && { type: 'Security Logging and Monitoring Failures', found: true },
          scanOptions.ssrf && { type: 'Server-Side Request Forgery (SSRF)', found: true },
          scanOptions.sqlInjection && { type: 'SQL Injection', found: true },
          scanOptions.xss && { type: 'Cross-Site Scripting (XSS)', found: true },
          scanOptions.bufferOverflow && { type: 'Buffer Overflow', found: true },
          scanOptions.insecureDeserialization && { type: 'Insecure Deserialization', found: true },
          scanOptions.sensitiveDataExposure && { type: 'Sensitive Data Exposure', found: true },
        ].filter(Boolean),
      };

      // Add dummy CVSS scores and risk levels
      results.vulnerabilities = results.vulnerabilities.map((vuln) => {
        const cvssScore = getRandomCVSS();
        return {
          ...vuln,
          cvssScore,
          riskLevel: getRiskLevel(cvssScore),
        };
      });

      setScanResults(results);
    } catch (err) {
      setError('An error occurred while scanning. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskDistribution = () => {
    if (!scanResults) return { low: 0, medium: 0, high: 0 };
    const riskCounts = { low: 0, medium: 0, high: 0 };
    scanResults.vulnerabilities.forEach((vuln) => {
      if (vuln.riskLevel === 'Low') riskCounts.low++;
      else if (vuln.riskLevel === 'Medium') riskCounts.medium++;
      else if (vuln.riskLevel === 'High') riskCounts.high++;
    });
    return riskCounts;
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const riskDistribution = getRiskDistribution();
  const pieData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        label: 'Risk Distribution',
        data: [riskDistribution.low, riskDistribution.medium, riskDistribution.high],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
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
        <Typography variant="h6" style={{ marginRight: '16px' }}>Select Scan Options</Typography>
        {Object.keys(scanOptions).map((key) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={scanOptions[key]}
                onChange={handleOptionChange}
                name={key}
                color="primary"
              />
            }
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            key={key}
          />
        ))}
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUrlSubmit}
        disabled={isScanning}
      >
        Start Scan
      </Button>
      {isScanning && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {scanResults && (
        <>
          <Typography variant="h6" gutterBottom>
            Scan Results for {scanResults.url}
          </Typography>
          <Grid container spacing={2}>
            {scanResults.vulnerabilities.map((vuln, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{vuln.type}</Typography>
                    <Typography>CVSS Score: {vuln.cvssScore}</Typography>
                    <Typography>Risk Level: {vuln.riskLevel}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pie data={pieData} />
        </>
      )}
    </Container>
  );
};

export default WebAppTesting;

