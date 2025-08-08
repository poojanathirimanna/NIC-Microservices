import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const username = localStorage.getItem('username') || 'User';
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide-on-scroll logic
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowNavbar(currentScroll < prevScrollPos || currentScroll < 10);
        setPrevScrollPos(currentScroll);
      }, 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [prevScrollPos]);

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
          '&:hover': {
            color: '#90caf9',
          },
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
          top: showNavbar ? 0 : '-100px',
          transition: 'top 0.4s ease-in-out',
          background: 'linear-gradient(to right, #4f46e5, #6b21a8)',
          zIndex: 1200,
          py: 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          {/* 👇 Left Side */}
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

              {/* 👇 Right Side */}
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
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
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

      {/* 👇 Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(to right, #4f46e5, #6b21a8)',
            color: 'white',
            paddingY: 2,
          },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                paddingY: 1.2,
                paddingX: 3,
                backgroundColor:
                  location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.icon}
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => {
              handleLogout();
              setDrawerOpen(false);
            }}
            sx={{
              paddingY: 1.2,
              paddingX: 3,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
