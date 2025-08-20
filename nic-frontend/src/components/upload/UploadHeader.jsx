import React from 'react';

const UploadHeader = ({ styles, isMobile, isTablet }) => {
  return (
    <div style={styles.header}>
      <div style={styles.headerIcon}>
        <span style={styles.iconEmoji}>📂</span>
      </div>
      <h1 style={{
        ...styles.title,
        fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px'
      }}>NIC CSV Upload</h1>
      <p style={{
        ...styles.subtitle,
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px'
      }}>
        Upload exactly 4 CSV files for validation and processing
      </p>
    </div>
  );
};

export default UploadHeader;
