import React from 'react';

const ActionButtons = ({
  styles,
  handleUpload,
  handleClear,
  isValidSelection,
  isUploading,
  isMobile,
  isTablet
}) => {
  return (
    <div style={{
      ...styles.actionButtons,
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '12px' : '16px'
    }}>
      <button
        onClick={handleUpload}
        style={{
          ...styles.primaryButton,
          padding: isMobile ? '12px 24px' : '16px 32px',
          fontSize: isMobile ? '14px' : '16px',
          width: isMobile ? '100%' : 'auto',
          ...(isValidSelection ? {} : styles.disabledButton),
          ...(isUploading ? styles.loadingButton : {})
        }}
        disabled={!isValidSelection || isUploading}
      >
        {isUploading ? (
          <>
            <span style={{...styles.spinner, fontSize: isMobile ? '14px' : '16px'}}>⟳</span>
            Processing...
          </>
        ) : (
          <>
            <span style={{...styles.buttonIcon, fontSize: isMobile ? '14px' : '16px'}}>🚀</span>
            Upload & Validate
          </>
        )}
      </button>

      <button
        onClick={handleClear}
        style={{
          ...styles.secondaryButton,
          padding: isMobile ? '12px 24px' : '16px 32px',
          fontSize: isMobile ? '14px' : '16px',
          width: isMobile ? '100%' : 'auto'
        }}
        disabled={isUploading}
      >
        <span style={{...styles.buttonIcon, fontSize: isMobile ? '14px' : '16px'}}>🗑️</span>
        Clear All
      </button>
    </div>
  );
};

export default ActionButtons;
