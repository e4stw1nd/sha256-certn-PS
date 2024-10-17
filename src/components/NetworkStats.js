import React from 'react';
import { Typography, Card, CardContent, Box, Grid, Link, Divider, Slider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter } from 'recharts';

// Mock Data
const trafficData = [
  { name: 'Jan', traffic: 400, traffic2: 300 },
  { name: 'Feb', traffic: 300, traffic2: 280 },
  { name: 'Mar', traffic: 200, traffic2: 220 },
  { name: 'Apr', traffic: 278, traffic2: 260 },
  { name: 'May', traffic: 189, traffic2: 190 },
];

const packetLossData = [
  { name: 'Jan', loss1: 300, loss2: 200 },
  { name: 'Feb', loss1: 250, loss2: 150 },
  { name: 'Mar', loss1: 200, loss2: 180 },
  { name: 'Apr', loss1: 278, loss2: 210 },
  { name: 'May', loss1: 189, loss2: 120 },
];

const throughputData = [
  { x: 100, y: 200 },
  { x: 120, y: 100 },
  { x: 170, y: 300 },
  { x: 140, y: 250 },
  { x: 150, y: 400 },
  { x: 110, y: 280 },
];

const latencyData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
];

const NetworkStats = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" color="primary" gutterBottom>

      </Typography>

      {/* First Section: Network Dashboard Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" color="secondary">
            Network Dashboard
          </Typography>
          <Typography variant="body1">Alerts: Role change detected</Typography>
          <Typography variant="body2" mt={2}>
            Traffic increased by 2.3% in the last 5 min
          </Typography>
        </CardContent>
      </Card>

      {/* Second Section: Network Monitoring */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Left: Roles and Activities */}
            <Grid item xs={6}>
              {/* Clickable Roles */}
              <Typography variant="h5" color="secondary" gutterBottom>
                Roles
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f7f7f7', borderRadius: 1 }}>
                <Typography variant="body1">
                  <Link href="/roles/admin" underline="hover">Admin (5)</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/roles/root" underline="hover">Root</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/roles/executer" underline="hover">Executer (3)</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/roles/sysadmin" underline="hover">Sys Admin</Link>
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Clickable Activities */}
              <Typography variant="h5" color="secondary" gutterBottom>
                Activities
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f7f7f7', borderRadius: 1 }}>
                <Typography variant="body1">
                  <Link href="/activities/view-traffic" underline="hover">View network traffic</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/activities/analyze-traffic" underline="hover">Analyze specific traffic</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/activities/schedule-maintenance" underline="hover">Schedule maintenance</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/activities/config-change" underline="hover">Configuration change</Link>
                </Typography>
              </Box>
            </Grid>

            {/* Right: Alerts and Traffic */}
            <Grid item xs={6}>
              {/* Clickable Alerts */}
              <Typography variant="h5" color="secondary" gutterBottom>
                Alerts
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f7f7f7', borderRadius: 1 }}>
                <Typography variant="body1">
                  <Link href="/alerts/firewall-config" underline="hover">Firewall Config</Link>
                </Typography>
                <Typography variant="body1">
                  <Link href="/alerts/siem-support" underline="hover">SIEM Support</Link>
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Traffic Chart */}
              <Typography variant="h5" color="secondary" gutterBottom>
                Traffic Stats
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Additional Alert */}
      <Typography variant="body2" color="error" mt={2}>
        ALERT: You haven't scanned config in 5 days
      </Typography>

      {/* Third Section: Network Statistics with Charts */}
      <Grid container spacing={3} mt={3}>
        {/* Network Traffic Overview */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" color="secondary">Network Traffic Overview</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="traffic" stroke="#00c2c7" />
              <Line type="monotone" dataKey="traffic2" stroke="#e30000" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>

        {/* Packet Loss */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" color="secondary">Packet Loss</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={packetLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="loss1" stackId="a" fill="#e30000" />
              <Bar dataKey="loss2" stackId="a" fill="#00c2c7" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Data Throughput */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" color="secondary">Data Throughput</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" />
              <YAxis type="number" dataKey="y" name="weight" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Data" data={throughputData} fill="#00c2c7" />
              <Scatter name="Data2" data={throughputData} fill="#e30000" />
            </ScatterChart>
          </ResponsiveContainer>
        </Grid>

        {/* Network Latency */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" color="secondary">Network Latency</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie dataKey="value" isAnimationActive={false} data={latencyData} cx="50%" cy="50%" outerRadius={80} fill="#00c2c7" label />
              <Pie dataKey="value" data={latencyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#e30000" label />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Filters & Settings Section */}
      <Box mt={3}>
        <Typography variant="h6">Filters & Settings</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1" mr={2}>Time Range</Typography>
          <Slider defaultValue={30} aria-label="Time Range" valueLabelDisplay="auto" />
        </Box>
        <RadioGroup row aria-label="data-type" name="row-radio-buttons-group" defaultValue="packets">
          <FormControlLabel value="packets" control={<Radio />} label="Packets" />
          <FormControlLabel value="bytes" control={<Radio />} label="Bytes" />
        </RadioGroup>
      </Box>

      {/* Footer */}
      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
          © 2023 Cyber Sentinel. All rights reserved. <br />
          Email: support@cybersentinel.com
        </Typography>
      </Box>
    </Box>
  );
};

export default NetworkStats;

