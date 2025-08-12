import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Grow, Slide } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import dashboardApi from '../services/dashboardApi';
import Navbar from '../components/Navbar'; // Navbar added

const DashboardPage = () => {
  const [summary, setSummary] = useState({ total: 0, male: 0, female: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await dashboardApi.get('/dashboard/summary');
        const data = res.data;
        setSummary({
          total: data.totalRecords,
          male: data.maleCount,
          female: data.femaleCount,
        });
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

  const hoverCard = {
    borderRadius: 3,
    transition: 'transform .25s ease, box-shadow .25s ease',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: 10 },
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: 10, // Push content below the navbar
          px: 4,
          pb: 4,
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #667eea, #764ba2)',
        }}
      >
        <Typography variant="h3" sx={{ mb: 5, color: '#fff', fontWeight: 'bold' }}>
          📊 Dashboard Summary
        </Typography>

        {/* Summary Cards (no centering, staggered Grow) */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            ['Total Records', summary.total],
            ['Male Records', summary.male],
            ['Female Records', summary.female],
          ].map(([label, value], idx) => (
            <Grid item xs={12} sm={4} key={label}>
              <Grow in timeout={400 + idx * 150}>
                <Card
                  sx={{
                    ...hoverCard,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                      {label}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Charts (no centering, slide up) */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Slide in direction="up" timeout={600}>
              <Card sx={{ ...hoverCard, p: 2, borderRadius: 3, backgroundColor: '#fff', boxShadow: 6, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                  Bar Chart
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: barData.map((item) => item.label) }]}
                  series={[{ data: barData.map((item) => item.value) }]}
                  width={400}
                  height={300}
                  colors={['#4f46e5']}
                />
              </Card>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6}>
            <Slide in direction="up" timeout={750}>
              <Card sx={{ ...hoverCard, p: 2, borderRadius: 3, backgroundColor: '#fff', boxShadow: 6, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                  Pie Chart
                </Typography>
                <PieChart
                  series={[{ data: pieData }]}
                  width={400}
                  height={300}
                  colors={['#4f46e5', '#facc15']}
                />
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardPage;
