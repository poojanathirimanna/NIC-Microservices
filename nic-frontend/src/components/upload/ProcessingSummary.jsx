import React from 'react';

const ProcessingSummary = ({ styles, responseInfo }) => {
  if (!responseInfo) return null;

  return (
    <div style={styles.summarySection}>
      <div style={styles.summaryHeader}>
        <span style={styles.summaryIcon}>📊</span>
        <h3 style={styles.summaryTitle}>Processing Summary</h3>
      </div>
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryCardIcon}>📁</span>
          <span style={styles.summaryCardLabel}>Files Processed</span>
          <span style={styles.summaryCardValue}>{responseInfo.filesProcessed}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryCardIcon}>✅</span>
          <span style={styles.summaryCardLabel}>Records Inserted</span>
          <span style={styles.summaryCardValue}>{responseInfo.inserted}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryCardIcon}>⏭️</span>
          <span style={styles.summaryCardLabel}>Records Skipped</span>
          <span style={styles.summaryCardValue}>{responseInfo.skipped}</span>
        </div>
      </div>
      <div style={styles.successMessage}>
        <span style={styles.successIcon}>🎉</span>
        <span style={styles.successText}>{responseInfo.message}</span>
      </div>
      {responseInfo.skippedNICs?.length > 0 && (
        <div style={styles.skippedSection}>
          <h4 style={styles.skippedTitle}>⚠️ Skipped NICs:</h4>
          <div style={styles.skippedList}>
            {responseInfo.skippedNICs.map((nic, idx) => (
              <span key={idx} style={styles.skippedItem}>{nic}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingSummary;
