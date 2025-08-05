import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);
      if (response.data.token) localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const goToRegister = () => navigate('/register', { state: { fromLogin: true } });
  const goToResetPassword = () => navigate('/reset-password', { state: { fromLogin: true } });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}> Welcome Back</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="username" placeholder="👤 Username" value={formData.username} onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="🔒 Password" value={formData.password} onChange={handleChange} required style={styles.input} />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>🎯 Login</button>
        </form>
        <div style={styles.links}>
          <span>Don't have an account?</span>
          <button onClick={goToRegister} style={styles.linkButton}>Register</button>
        </div>
        <div style={styles.links}>
          <button onClick={goToResetPassword} style={styles.linkButton}>Forgot Password?</button>
        </div>
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
     fontFamily: 'Segoe UI, sans-serif',
   },

  card: {
    width: 400,
    padding: 35,
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: 30,
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
    color: '#F5F5F5 ',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    backgroundColor: ' #00A5B8',
    color: '#F5F5F5 ',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  links: {
    marginTop: 15,
    fontSize: 14,
  },
  linkButton: {
    background: 'none',
    color: '  #FFC069',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 6,
    textDecoration: 'underline',
  },
  error: {
    color: '#ff4d4f',
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    padding: '8px',
    borderRadius: '6px',
    fontSize: 14,
  },
};

export default LoginPage;
