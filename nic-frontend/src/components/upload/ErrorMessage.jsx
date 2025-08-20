import React from 'react';

const ErrorMessage = ({ styles, error, isMobile, isTablet }) => {
  if (!error) return null;

  return (
    <div style={{
      ...styles.errorCard,
      padding: isMobile ? '12px 16px' : '16px 20px'
    }}>
      <span style={{
        ...styles.errorIcon,
        fontSize: isMobile ? '16px' : '20px'
      }}>❌</span>
      <span style={{
        ...styles.errorText,
        fontSize: isMobile ? '12px' : '14px'
      }}>{error}</span>
    </div>
  );
};

export default ErrorMessage;
