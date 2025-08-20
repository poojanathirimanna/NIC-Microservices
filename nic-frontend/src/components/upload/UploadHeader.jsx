import React from 'react';

const UploadHeader = ({ styles }) => {
  return (
    <div style={styles.header}>
      <div style={styles.headerIcon}>
        <span style={styles.iconEmoji}>📂</span>
      </div>
      <h1 style={styles.title}>NIC CSV Upload</h1>
      <p style={styles.subtitle}>
        Upload exactly 4 CSV files for validation and processing
      </p>
    </div>
  );
};

export default UploadHeader;
