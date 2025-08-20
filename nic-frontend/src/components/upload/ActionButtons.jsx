import React from 'react';

const ActionButtons = ({
  styles,
  handleUpload,
  handleClear,
  isValidSelection,
  isUploading
}) => {
  return (
    <div style={styles.actionButtons}>
      <button
        onClick={handleUpload}
        style={{
          ...styles.primaryButton,
          ...(isValidSelection ? {} : styles.disabledButton),
          ...(isUploading ? styles.loadingButton : {})
        }}
        disabled={!isValidSelection || isUploading}
      >
        {isUploading ? (
          <>
            <span style={styles.spinner}>⟳</span>
            Processing...
          </>
        ) : (
          <>
            <span style={styles.buttonIcon}>🚀</span>
            Upload & Validate
          </>
        )}
      </button>

      <button
        onClick={handleClear}
        style={styles.secondaryButton}
        disabled={isUploading}
      >
        <span style={styles.buttonIcon}>🗑️</span>
        Clear All
      </button>
    </div>
  );
};

export default ActionButtons;
