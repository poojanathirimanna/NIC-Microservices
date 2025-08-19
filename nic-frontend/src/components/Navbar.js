import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List,
  ListItem, ListItemText, ListItemButton, ListItemIcon, useMediaQuery,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';

const SCROLL_THRESHOLD = 8; // px movement before toggling

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const username = localStorage.getItem('username') || 'User';

  const [showNavbar, setShowNavbar] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Stable refs for scroll logic
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;

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
    { label: 'Upload NICs', path: '/upload-nic', icon: <UploadFileIcon /> },
    { label: 'Dashboard Summary', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Past Records', path: '/past-records', icon: <HistoryIcon /> },
  ];

  const renderNavLinks = () =>
    navItems.map((item) => (
      <Typography
        key={item.path}
        component={Link}
        to={item.path}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: location.pathname === item.path ? '#ffc107' : 'white',
          fontWeight: 'bold',
          fontSize: 15.5,
          letterSpacing: 0.5,
          transition: '0.3s',
          '&:hover': { color: '#90caf9' },
        }}
      >
        <Box sx={{ mr: 1 }}>{item.icon}</Box>
        {item.label}
      </Typography>
    ));

  return (
    <>
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          transform: showNavbar ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.35s ease',
          willChange: 'transform',
          pointerEvents: showNavbar ? 'auto' : 'none',
          background: 'linear-gradient(to right, #4f46e5, #6b21a8)',
          zIndex: 1200,
          py: 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontWeight: 'bold', color: '#fff' }}>
                Hi, {username.toLowerCase()} 👋
              </Typography>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 4 }}>{renderNavLinks()}</Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  Hi, {username.toLowerCase()} 👋
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                  onClick={handleLogout}
                >
                  SIGN OUT
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Spacer so page content sits below the fixed AppBar */}
      <Toolbar />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(to right, #4f46e5, #6b21a8)',
            color: 'white',
            py: 2,
          },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {navItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false);
                  }}
                  selected={selected}
                  sx={{
                    gap: 2,
                    py: 1.2,
                    px: 3,
                    color: 'inherit',
                    ...(selected && { backgroundColor: 'rgba(255, 255, 255, 0.15)' }),
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                setDrawerOpen(false);
              }}
              sx={{
                py: 1.2,
                px: 3,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
