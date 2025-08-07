import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const DashboardPage = () => {
  const [summary, setSummary] = useState({ total: 0, male: 0, female: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem('token'); // adjust if using context
      try {
        const res = await axios.get('http://localhost:8082/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      }
    };

    fetchSummary();
  }, []);

  const barData = [
    { label: 'Male', value: summary.male },
    { label: 'Female', value: summary.female },
  ];

  const pieData = [
    { id: 0, value: summary.male, label: 'Male' },
    { id: 1, value: summary.female, label: 'Female' },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>📊 Dashboard Summary</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Records</Typography>
              <Typography variant="h4">{summary.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Male Records</Typography>
              <Typography variant="h4">{summary.male}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Female Records</Typography>
              <Typography variant="h4">{summary.female}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6">Bar Chart</Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: barData.map((item) => item.label) }]}
          series={[{ data: barData.map((item) => item.value) }]}
          width={500}
          height={300}
        />
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Pie Chart</Typography>
        <PieChart
          series={[{ data: pieData }]}
          width={400}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default DashboardPage;
