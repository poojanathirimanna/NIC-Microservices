import React from 'react';

const ErrorMessage = ({ styles, error }) => {
  if (!error) return null;

  return (
    <div style={styles.errorCard}>
      <span style={styles.errorIcon}>❌</span>
      <span style={styles.errorText}>{error}</span>
    </div>
  );
};

export default ErrorMessage;
