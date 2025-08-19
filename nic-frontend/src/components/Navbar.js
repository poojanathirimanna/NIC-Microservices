import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List,
  ListItem, ListItemText, ListItemButton, ListItemIcon, useMediaQuery,
  Avatar, Chip, Divider, Fade, Slide
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

const SCROLL_THRESHOLD = 8; // px movement before toggling

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const username = localStorage.getItem('username') || 'User';

  const [showNavbar, setShowNavbar] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Stable refs for scroll logic
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;

      // Track if user has scrolled for background effect
      setScrolled(current > 10);

      // Ignore tiny jitter
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const goingUp = delta < 0;
        const nearTop = current < 10;
        setShowNavbar(goingUp || nearTop);
        lastScrollYRef.current = current;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const navItems = [
    { label: 'Upload NICs', path: '/upload-nic', icon: <UploadFileIcon />, color: '#4ade80' },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, color: '#60a5fa' },
    { label: 'Past Records', path: '/past-records', icon: <HistoryIcon />, color: '#a78bfa' },
  ];

  const renderNavLinks = () =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Box
          key={item.path}
          component={Link}
          to={item.path}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
            fontWeight: isActive ? '700' : '600',
            fontSize: '15px',
            letterSpacing: '0.5px',
            padding: '12px 20px',
            borderRadius: '12px',
            background: isActive
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
              : 'transparent',
            backdropFilter: isActive ? 'blur(10px)' : 'none',
            border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: isActive ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none',
            '&:hover': {
              color: '#ffffff',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              width: isActive ? '80%' : '0%',
              height: '2px',
              background: 'linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.5))',
              borderRadius: '2px',
              transform: 'translateX(-50%)',
              transition: 'width 0.3s ease',
            },
            '&:hover::before': {
              width: '80%',
            }
          }}
        >
          <Box
            sx={{
              color: isActive ? item.color : 'inherit',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {item.icon}
          </Box>
          {item.label}
        </Box>
      );
    });

  return (
    <>
      <Slide direction="down" in={showNavbar} timeout={300}>
        <AppBar
          position="fixed"
          elevation={scrolled ? 8 : 2}
          sx={{
            background: scrolled
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))'
              : 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1200,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
              pointerEvents: 'none',
            }
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: { xs: 2, md: 4 },
              py: 1,
              minHeight: '72px !important'
            }}
          >
            {isMobile ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon sx={{ color: '#4ade80', fontSize: '20px' }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '700',
                        color: '#ffffff',
                        fontSize: '18px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      NIC Portal
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  avatar={<Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}><PersonIcon fontSize="small" /></Avatar>}
                  label={`Hi, ${username}`}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: '600',
                    '& .MuiChip-avatar': {
                      color: 'white'
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <SecurityIcon sx={{ color: '#4ade80', fontSize: '22px' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: '700',
                        color: '#ffffff',
                        fontSize: '20px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      NIC Portal
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {renderNavLinks()}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Chip
                    avatar={<Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}><PersonIcon fontSize="small" /></Avatar>}
                    label={`Welcome, ${username}`}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      fontWeight: '600',
                      fontSize: '14px',
                      '& .MuiChip-avatar': {
                        color: 'white'
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      fontWeight: '600',
                      fontSize: '14px',
                      padding: '8px 20px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                      },
                    }}
                  >
                    Sign Out
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Enhanced Spacer */}
      <Box sx={{ height: '72px' }} />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
            backdropFilter: 'blur(20px)',
            color: 'white',
            border: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)',
              pointerEvents: 'none',
            }
          },
        }}
        transitionDuration={300}
      >
        {/* Drawer Header */}
        <Box sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <SecurityIcon sx={{ color: '#4ade80', fontSize: '26px' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '18px' }}>
                NIC Portal
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Secure Data Management
              </Typography>
            </Box>
          </Box>
          <Chip
            avatar={<Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}><PersonIcon fontSize="small" /></Avatar>}
            label={`${username}`}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              fontWeight: '600',
              width: '100%',
              justifyContent: 'flex-start',
              '& .MuiChip-avatar': {
                color: 'white'
              }
            }}
          />
        </Box>

        <List sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <Fade in={true} timeout={300} key={item.path}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      setDrawerOpen(false);
                    }}
                    selected={selected}
                    sx={{
                      borderRadius: '12px',
                      py: 1.5,
                      px: 2,
                      mb: 0.5,
                      color: 'inherit',
                      background: selected
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
                        : 'transparent',
                      border: selected ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(8px)'
                      },
                    }}
                  >
                    <ListItemIcon sx={{
                      color: selected ? item.color : 'rgba(255, 255, 255, 0.8)',
                      minWidth: 40,
                      transition: 'color 0.3s ease'
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: selected ? '700' : '600',
                          fontSize: '15px'
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Fade>
            );
          })}

          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Fade in={true} timeout={400}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: 2,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateX(8px)'
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sign Out"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: '600',
                      fontSize: '15px'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Fade>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
