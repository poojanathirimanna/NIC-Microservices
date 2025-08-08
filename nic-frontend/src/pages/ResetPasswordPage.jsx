import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');
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
    setMessage('');
    setError('');

    try {
      await api.post('/auth/forgot-password', {
        username: formData.username,
        email: formData.email,
        newPassword: formData.newPassword,
      });

      setMessage('✅ Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Reset failed. Please check username/email.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔒 Reset Password</h2>
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
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {message && <p style={styles.message}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>🔁 Reset</button>
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
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    textAlign: 'center',
    color: '#fff',
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
    gap: 40,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
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
  },
  message: {
    color: '#00e676',
    fontSize: 14,
    marginTop: 10,
  },
  error: {
    color: '#D32F2F',
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
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
    form: {
      gap: 24,
    },
  },
};
export default ResetPasswordPage;
