import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Grow, Slide, Chip, Avatar, LinearProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import dashboardApi from '../services/dashboardApi';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [summary, setSummary] = useState({ total: 0, male: 0, female: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [animateNumbers, setAnimateNumbers] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await dashboardApi.get('/dashboard/summary');
        const data = res.data;
        setSummary({
          total: data.totalRecords,
          male: data.maleCount,
          female: data.femaleCount,
        });
        setError('');
        // Trigger number animation after data loads
        setTimeout(() => setAnimateNumbers(true), 500);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
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

  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  const summaryCards = [
    {
      title: 'Total Records',
      value: summary.total,
      icon: '📊',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#667eea',
      description: 'All NIC records in database'
    },
    {
      title: 'Male Records',
      value: summary.male,
      icon: '👨',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      color: '#4facfe',
      description: `${calculatePercentage(summary.male, summary.total)}% of total`
    },
    {
      title: 'Female Records',
      value: summary.female,
      icon: '👩',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      color: '#f093fb',
      description: `${calculatePercentage(summary.female, summary.total)}% of total`
    },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.modernSpinner}>
              <div style={styles.spinnerRing}></div>
              <div style={styles.spinnerInner}>📊</div>
            </div>
            <h2 style={styles.loadingText}>Loading Dashboard...</h2>
            <div style={styles.loadingSubtext}>Fetching real-time data</div>
            <div style={styles.loadingProgress}>
              <LinearProgress
                sx={{
                  width: '200px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                  }
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={styles.wrapper}>
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <h2 style={styles.errorTitle}>Unable to Load Dashboard</h2>
            <p style={styles.errorText}>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.headerIcon} className="pulse-animation">
              <span style={styles.iconEmoji}>📊</span>
            </div>
            <h1 style={styles.title} className="fade-in-up">Dashboard Analytics</h1>
            <p style={styles.subtitle} className="fade-in-up">
              Real-time overview of NIC records and demographic insights
            </p>
            <div style={styles.headerStats}>
              <div style={styles.quickStat}>
                <span style={styles.quickStatIcon}>⚡</span>
                <span style={styles.quickStatText}>Live Data</span>
              </div>
              <div style={styles.quickStat}>
                <span style={styles.quickStatIcon}>🔄</span>
                <span style={styles.quickStatText}>Auto-Updated</span>
              </div>
            </div>
            <Chip
              label={`Last Updated: ${new Date().toLocaleString()}`}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                fontWeight: '500',
                mt: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                }
              }}
            />
          </div>

          {/* Summary Cards */}
          <div style={styles.summarySection}>
            <h3 style={styles.sectionTitle}>📈 Summary Overview</h3>
            <div style={styles.cardsGrid}>
              {summaryCards.map((card, idx) => (
                <Grow in timeout={400 + idx * 150} key={card.title}>
                  <div style={styles.summaryCard} className="hover-lift">
                    <div style={{...styles.cardIcon, background: card.gradient}}>
                      <span style={styles.cardIconEmoji}>{card.icon}</span>
                    </div>
                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{card.title}</h4>
                      <div style={styles.cardValue}>
                        {animateNumbers ? card.value.toLocaleString() : '0'}
                      </div>
                      <p style={styles.cardDescription}>{card.description}</p>
                    </div>
                    <div style={{...styles.cardAccent, background: card.gradient}}></div>
                  </div>
                </Grow>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div style={styles.chartsSection}>
            <h3 style={styles.sectionTitle}>📊 Data Visualization</h3>
            <div style={styles.chartsGrid}>
              {/* Bar Chart */}
              <Slide in direction="up" timeout={600}>
                <div style={styles.chartCard} className="hover-lift">
                  <div style={styles.chartHeader}>
                    <div style={styles.chartHeaderLeft}>
                      <span style={styles.chartIcon}>📊</span>
                      <div>
                        <h4 style={styles.chartTitle}>Gender Distribution</h4>
                        <p style={styles.chartSubtitle}>Comparative view by gender</p>
                      </div>
                    </div>
                    <Chip
                      label="Bar Chart"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                  <div style={styles.chartContainer}>
                    <BarChart
                      xAxis={[{
                        scaleType: 'band',
                        data: barData.map((item) => item.label),
                        tickLabelStyle: { fontSize: '14px', fontWeight: '500' }
                      }]}
                      series={[{
                        data: barData.map((item) => item.value),
                        color: '#667eea'
                      }]}
                      width={400}
                      height={280}
                      margin={{ left: 60, right: 60, top: 40, bottom: 60 }}
                    />
                  </div>
                  <div style={styles.chartStats}>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Male</span>
                      <span style={styles.statValue}>{summary.male}</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statLabel}>Female</span>
                      <span style={styles.statValue}>{summary.female}</span>
                    </div>
                  </div>
                </div>
              </Slide>

              {/* Pie Chart */}
              <Slide in direction="up" timeout={750}>
                <div style={styles.chartCard} className="hover-lift">
                  <div style={styles.chartHeader}>
                    <div style={styles.chartHeaderLeft}>
                      <span style={styles.chartIcon}>🥧</span>
                      <div>
                        <h4 style={styles.chartTitle}>Gender Breakdown</h4>
                        <p style={styles.chartSubtitle}>Proportional distribution</p>
                      </div>
                    </div>
                    <Chip
                      label="Pie Chart"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        color: 'white',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                  <div style={styles.chartContainer}>
                    <PieChart
                      series={[{
                        data: pieData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      }]}
                      width={400}
                      height={280}
                      colors={['#4facfe', '#f093fb']}
                    />
                  </div>
                  <div style={styles.chartLegend}>
                    <div style={styles.legendItem}>
                      <div style={{...styles.legendColor, background: '#4facfe'}}></div>
                      <span style={styles.legendLabel}>Male ({calculatePercentage(summary.male, summary.total)}%)</span>
                    </div>
                    <div style={styles.legendItem}>
                      <div style={{...styles.legendColor, background: '#f093fb'}}></div>
                      <span style={styles.legendLabel}>Female ({calculatePercentage(summary.female, summary.total)}%)</span>
                    </div>
                  </div>
                </div>
              </Slide>
            </div>
          </div>

          {/* Insights Section */}
          <div style={styles.insightsSection}>
            <h3 style={styles.sectionTitle}>💡 Key Insights</h3>
            <div style={styles.insightsGrid}>
              <div style={styles.insightCard}>
                <span style={styles.insightIcon}>📈</span>
                <div style={styles.insightContent}>
                  <h4 style={styles.insightTitle}>Total Records</h4>
                  <p style={styles.insightText}>
                    Currently managing {summary.total.toLocaleString()} NIC records in the system
                  </p>
                </div>
              </div>
              <div style={styles.insightCard}>
                <span style={styles.insightIcon}>⚖️</span>
                <div style={styles.insightContent}>
                  <h4 style={styles.insightTitle}>Gender Balance</h4>
                  <p style={styles.insightText}>
                    {summary.male > summary.female ? 'Male' : 'Female'} records are {Math.abs(calculatePercentage(summary.male, summary.total) - calculatePercentage(summary.female, summary.total)).toFixed(1)}% higher // than the other
                  </p>
                </div>
              </div>
              <div style={styles.insightCard}>
                <span style={styles.insightIcon}>��</span>
                <div style={styles.insightContent}>
                  <h4 style={styles.insightTitle}>Data Quality</h4>
                  <p style={styles.insightText}>
                    All records processed successfully with complete demographic data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fade-in-up {
            animation: fadeInUp 0.4s ease-out;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: `
      linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 25%, rgba(51, 65, 85, 0.8) 50%, rgba(71, 85, 105, 0.75) 75%, rgba(100, 116, 139, 0.7) 100%),
      url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '100px 20px 40px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
  },
  headerIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  iconEmoji: {
    fontSize: '36px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    letterSpacing: '-1px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.9,
    margin: 0,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'white',
  },
  modernSpinner: {
    position: 'relative',
    width: '64px',
    height: '64px',
    marginBottom: '20px',
  },
  spinnerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '8px solid rgba(255, 255, 255, 0.3)',
    animation: 'spin 1s linear infinite',
  },
  spinnerInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#4caf50',
    fontWeight: '700',
  },
  loadingText: {
    fontSize: '24px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loadingSubtext: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '8px 0 16px 0',
  },
  loadingProgress: {
    width: '200px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#4caf50',
    }
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'white',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  errorTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 16px 0',
  },
  errorText: {
    fontSize: '16px',
    opacity: 0.8,
    maxWidth: '400px',
  },
  summarySection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 32px 0',
    letterSpacing: '-0.5px',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(15px)',
  },
  cardIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
  cardIconEmoji: {
    fontSize: '28px',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0 0 8px 0',
  },
  cardValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 8px 0',
    letterSpacing: '-1px',
  },
  cardDescription: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '4px',
    height: '100%',
  },
  chartsSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '32px',
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(15px)',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  chartHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  chartIcon: {
    fontSize: '24px',
  },
  chartTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 4px 0',
  },
  chartSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  chartStats: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '16px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
  },
  chartLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  legendLabel: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
  },
  insightsSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  insightCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(15px)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    }
  },
  insightIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 8px 0',
  },
  insightText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0,
    lineHeight: '1.5',
  },
  headerStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '16px',
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
    }
  },
  quickStatIcon: {
    fontSize: '20px',
    color: '#4caf50',
  },
  quickStatText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
};

export default DashboardPage;
