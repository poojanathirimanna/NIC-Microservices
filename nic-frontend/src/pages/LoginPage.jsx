import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username || formData.username);
      }

      // Add a small delay for better UX
      setTimeout(() => {
        navigate('/upload-nic', { replace: true });
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  const goToRegister = () => navigate('/register', { state: { fromLogin: true } });
  const goToResetPassword = () => navigate('/reset-password', { state: { fromLogin: true } });

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.backgroundShapes}>
        <div style={styles.shape1} className="floating-shape"></div>
        <div style={styles.shape2} className="floating-shape-delayed"></div>
        <div style={styles.shape3} className="floating-shape"></div>
        <div style={styles.shape4} className="floating-shape"></div>
      </div>

      {/* Grid Pattern Background */}
      <div style={styles.gridPattern}></div>

      <div style={styles.loginWrapper}>
        {/* Brand Section */}
        <div style={styles.brandSection} className={mounted ? 'slide-down' : ''}>
          <div style={styles.logoContainer}>
            <div style={styles.logo} className="pulse-logo">
              <span style={styles.logoIcon}>🔐</span>
            </div>
          </div>
          <h1 style={styles.brandTitle}>NIC Portal</h1>
          <p style={styles.brandSubtitle}>Secure Enterprise Data Management</p>
        </div>

        {/* Login Card */}
        <div style={styles.loginCard} className={mounted ? 'fade-in-up' : ''}>
          <div style={styles.cardHeader}>
            <h2 style={styles.welcomeTitle}>Welcome Back</h2>
            <p style={styles.welcomeSubtitle}>Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Username Field */}
            <div style={styles.inputGroup} className="input-focus-group">
              <div style={styles.inputIcon}>
                <span>👤</span>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                style={styles.input}
                className="modern-input"
              />
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup} className="input-focus-group">
              <div style={styles.inputIcon}>
                <span>🔒</span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                className="modern-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
                className="password-toggle-btn"
              >
                <span>{showPassword ? '👁️' : '👁️‍🗨️'}</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorCard} className="shake-error">
                <span style={styles.errorIcon}>⚠️</span>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.loginButton,
                ...(isLoading ? styles.loadingButton : {})
              }}
              className="login-btn-hover"
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner} className="spin">⟳</span>
                  Signing In...
                </>
              ) : (
                <>
                  <span style={styles.buttonIcon}>🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>

          {/* Action Links */}
          <div style={styles.actionLinks}>
            <div style={styles.linkGroup}>
              <span style={styles.linkText}>Don't have an account?</span>
              <button
                onClick={goToRegister}
                style={styles.actionButton}
                className="action-btn-hover"
              >
                Create Account
              </button>
            </div>
            <button
              onClick={goToResetPassword}
              style={styles.forgotButton}
              className="forgot-btn-hover"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer} className={mounted ? 'fade-in-delayed' : ''}>
          <p style={styles.footerText}>
            © 2025 NIC Portal. Enterprise-grade security and reliability.
          </p>
        </div>
      </div>

      {/* CSS Animations */}
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.6);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .slide-down {
          animation: slideDown 0.6s ease-out;
        }

        .fade-in-delayed {
          animation: fadeIn 1s ease-out 0.5s both;
        }

        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }

        .pulse-logo {
          animation: pulse 2s ease-in-out infinite;
        }

        .shake-error {
          animation: shake 0.5s ease-in-out, fadeInUp 0.5s ease-out;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        .modern-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .input-focus-group:focus-within {
          transform: translateY(-2px);
        }

        .login-btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .login-btn-hover:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .login-btn-hover:active {
          transform: translateY(-1px);
        }

        .action-btn-hover {
          transition: all 0.3s ease;
        }

        .action-btn-hover:hover {
          transform: translateY(-2px);
          color: #667eea;
        }

        .forgot-btn-hover {
          transition: all 0.3s ease;
        }

        .forgot-btn-hover:hover {
          transform: translateY(-1px);
          color: #ff6b6b;
        }

        .password-toggle-btn {
          transition: all 0.2s ease;
        }

        .password-toggle-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.1);
        }

        /* Focus states for accessibility */
        .modern-input:focus,
        .login-btn-hover:focus,
        .action-btn-hover:focus,
        .forgot-btn-hover:focus {
          outline: 2px solid rgba(102, 126, 234, 0.5);
          outline-offset: 2px;
        }

        /* Responsive animations */
        @media (max-width: 768px) {
          .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }

          .floating-shape {
            animation: none;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3730a3 50%, #312e81 75%, #1e1b4b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  shape1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '100px',
    height: '100px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
  },
  shape2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: '150px',
    height: '150px',
    background: 'rgba(79, 70, 229, 0.08)',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    backdropFilter: 'blur(10px)',
  },
  shape3: {
    position: 'absolute',
    bottom: '10%',
    left: '20%',
    width: '80px',
    height: '80px',
    background: 'rgba(99, 102, 241, 0.12)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
  },
  shape4: {
    position: 'absolute',
    top: '30%',
    right: '60%',
    width: '120px',
    height: '120px',
    background: 'rgba(67, 56, 202, 0.09)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
  },
  gridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
  loginWrapper: {
    width: '100%',
    maxWidth: '420px',
    position: 'relative',
    zIndex: 1,
  },
  brandSection: {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(147, 197, 253, 0.3)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
  },
  logoIcon: {
    fontSize: '32px',
  },
  brandTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  brandSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: 0,
    fontWeight: '400',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    position: 'relative',
    transition: 'transform 0.3s ease',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#64748b',
    zIndex: 2,
  },
  input: {
    width: '100%',
    padding: '16px 20px 16px 50px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: '#f8fafc',
    color: '#1e293b',
    outline: 'none',
    fontWeight: '500',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  passwordToggle: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
  errorCard: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  errorIcon: {
    fontSize: '20px',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: '500',
    margin: 0,
  },
  loginButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  loadingButton: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  buttonIcon: {
    fontSize: '16px',
  },
  spinner: {
    fontSize: '16px',
    marginRight: '8px',
  },
  divider: {
    position: 'relative',
    margin: '32px 0',
    textAlign: 'center',
  },
  dividerText: {
    background: 'rgba(255, 255, 255, 0.98)',
    color: '#64748b',
    padding: '0 16px',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1,
  },
  actionLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
  },
  linkGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: '14px',
    color: '#64748b',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  forgotButton: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  footerText: {
    fontSize: '12px',
    margin: 0,
    opacity: 0.8,
  },
};

export default LoginPage;
