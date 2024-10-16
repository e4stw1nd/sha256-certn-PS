import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', traffic: 400 },
  { name: 'Feb', traffic: 300 },
  { name: 'Mar', traffic: 200 },
  { name: 'Apr', traffic: 278 },
  { name: 'May', traffic: 189 },
];

const NetworkStats = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="primary">
          Network Stats
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NetworkStats;

