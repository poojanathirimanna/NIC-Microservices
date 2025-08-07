// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from '../services/api'; // ✅ assuming this has axios with baseURL + token setup

const DashboardPage = () => {
  const [summary, setSummary] = useState({
    totalRecords: 0,
    maleCount: 0,
    femaleCount: 0
  });

  useEffect(() => {
    axios.get('/api/nic/dashboard-summary')
      .then(res => {
        setSummary(res.data);
      })
      .catch(err => {
        console.error('Failed to load summary:', err);
      });
  }, []);

  const data = [
    { label: 'Male', value: summary.maleCount },
    { label: 'Female', value: summary.femaleCount }
  ];

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', background: 'linear-gradient(to right, #4a55a2, #7895cb)' }}>
      <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
        Dashboard Summary
      </Typography>

      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <StatCard title="Total Records" value={summary.totalRecords} />
        <StatCard title="Male" value={summary.maleCount} />
        <StatCard title="Female" value={summary.femaleCount} />
      </Grid>

      <Typography variant="subtitle1" fontWeight="bold" color="white" gutterBottom>
        Gender Distribution
      </Typography>

      <Box sx={{ background: 'white', borderRadius: 2, p: 2, maxWidth: 600 }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: data.map(item => item.label) }]}
          series={[{ data: data.map(item => item.value), label: 'Count' }]}
          width={500}
          height={300}
        />
      </Box>
    </Box>
  );
};

const StatCard = ({ title, value }) => (
  <Grid item xs={12} sm={4}>
    <Card sx={{ background: '#fff' }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default DashboardPage;
