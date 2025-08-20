import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!location.state?.fromLogin) {
      navigate('/login');
    }
  }, [location, navigate]);

  if (!location.state?.fromLogin) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // clear any previous error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Client-side validations
    if (!formData.username.trim() || formData.username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      setIsLoading(false);
      return;
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/register', {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log('Registration successful:', response.data);

      // Add a small delay for better UX
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  const goToLogin = () => navigate('/login');

  const RotatingBackground = () => (
    <div style={{
      position: 'fixed',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '250%',
      backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      animation: 'slowRotate 600s linear infinite',
      zIndex: -5,
      border: '5px solid red', // Temporary border to see if the div is working
    }} />
  );

  return (
    <div style={styles.container}>
      <RotatingBackground />
      {/* Background Pattern */}
      <div style={styles.backgroundPattern}></div>

      <div style={styles.registerWrapper}>
        {/* Brand Section */}
        <div style={styles.brandSection} className={mounted ? 'slide-down' : ''}>
          <div style={styles.logoContainer}>
            <div style={styles.logo} className="pulse-logo">
              <span style={styles.logoIcon}>🔐</span>
            </div>
          </div>
          <h1 style={styles.brandTitle}>NIC Portal</h1>
          <p style={styles.brandSubtitle}>Join Our Secure Enterprise Platform</p>
        </div>

        {/* Register Card */}
        <div style={styles.registerCard} className={mounted ? 'fade-in-up' : ''}>
          <div style={styles.cardHeader}>
            <h2 style={styles.welcomeTitle}>Create Account</h2>
            <p style={styles.welcomeSubtitle}>Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form} noValidate>
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
                minLength={3}
                style={styles.input}
                className="modern-input"
              />
            </div>

            {/* Email Field */}
            <div style={styles.inputGroup} className="input-focus-group">
              <div style={styles.inputIcon}>
                <span>✉️</span>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Please enter a valid email address"
                style={styles.input}
                className="modern-input"
              />
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup} className="input-focus-group">
              <div style={styles.inputIcon}>
                <span>�</span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
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

            {/* Confirm Password Field */}
            <div style={styles.inputGroup} className="input-focus-group">
              <div style={styles.inputIcon}>
                <span>🔐</span>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={styles.input}
                className="modern-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.passwordToggle}
                className="password-toggle-btn"
              >
                <span>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorCard} className="shake-error">
                <span style={styles.errorIcon}>⚠️</span>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.registerButton,
                ...(isLoading ? styles.loadingButton : {})
              }}
              className="register-btn-hover"
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner} className="spin">⟳</span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span style={styles.buttonIcon}>🚀</span>
                  Create Account
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
              <span style={styles.linkText}>Already have an account?</span>
              <button
                onClick={goToLogin}
                style={styles.actionButton}
                className="action-btn-hover"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer} className={mounted ? 'fade-in-delayed' : ''}>
          <p style={styles.footerText}>
            © 2025 NIC Portal.
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

        /* Slow Rotating Background Animation */
        @keyframes slowRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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

        .register-btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .register-btn-hover:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .register-btn-hover:active {
          transform: translateY(-1px);
        }

        .action-btn-hover {
          transition: all 0.3s ease;
        }

        .action-btn-hover:hover {
          transform: translateY(-2px);
          color: #667eea;
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
        .register-btn-hover:focus,
        .action-btn-hover:focus {
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
    background: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.80) 25%, rgba(51, 65, 85, 0.75) 50%, rgba(71, 85, 105, 0.70) 75%, rgba(100, 116, 139, 0.65) 100%)`,
    // Removed the static background image that was conflicting with the rotating background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 2px, transparent 2px)
    `,
    backgroundSize: '60px 60px, 60px 60px, 100px 100px',
    pointerEvents: 'none',
    opacity: 0.6,
  },
  registerWrapper: {
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
    background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(203, 213, 225, 0.15) 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(226, 232, 240, 0.2)',
    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.3)',
  },
  logoIcon: {
    fontSize: '32px',
  },
  brandTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    color: '#f8fafc',
  },
  brandSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
    fontWeight: '400',
    color: 'rgba(226, 232, 240, 0.9)',
  },
  registerCard: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(226, 232, 240, 0.3)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    color: '#475569',
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
    transition: 'color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '16px 20px 16px 50px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: '#f8fafc',
    color: '#0f172a',
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
    transition: 'all 0.2s ease',
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
  registerButton: {
    background: 'linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%)',
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
    boxShadow: '0 4px 14px rgba(51, 65, 85, 0.4)',
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
    color: '#334155',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    color: 'rgba(226, 232, 240, 0.8)',
  },
  footerText: {
    fontSize: '12px',
    margin: 0,
    opacity: 0.9,
  },
};

export default RegisterPage;
