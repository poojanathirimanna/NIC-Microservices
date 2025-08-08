import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!location.state?.fromLogin) {
      navigate('/login');
    }
  }, [location, navigate]);

  if (!location.state?.fromLogin) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>🚀 REGISTER</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: '35px 16px',
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    textAlign: 'center',
    color: '#F5F5F5',
    margin: '0 8px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#F5F5F5',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#00A5B8',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    justifyContent: 'center',
  },
  error: {
    color: '#D32F2F',
    backgroundColor: 'rgba(211, 47, 47, 0.15)',
    padding: '8px',
    borderRadius: '6px',
    fontSize: 14,
  },
  // Responsive styles
  '@media (max-width: 500px)': {
    card: {
      padding: '16px 4px',
      maxWidth: '95vw',
    },
    title: {
      fontSize: '20px',
    },
    input: {
      fontSize: 15,
      padding: 10,
    },
    button: {
      fontSize: 15,
      padding: 10,
    },
  },
};
export default RegisterPage;