import React from 'react';

const FileUploadArea = ({
  styles,
  dragActive,
  files,
  handleDrag,
  handleDrop,
  fileInputRef,
  isMobile,
  isTablet
}) => {
  return (
    <div
      style={{
        ...styles.uploadArea,
        padding: isMobile ? '32px 16px' : '48px 24px',
        ...(dragActive ? styles.uploadAreaActive : {}),
        ...(files.length > 0 ? styles.uploadAreaWithFiles : {})
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div style={styles.uploadContent}>
        <div style={{
          ...styles.uploadIcon,
          width: isMobile ? '48px' : '64px',
          height: isMobile ? '48px' : '64px'
        }}>
          {files.length > 0 ? (
            <span style={{...styles.uploadIconEmoji, fontSize: isMobile ? '24px' : '28px'}}>✅</span>
          ) : (
            <span style={{...styles.uploadIconEmoji, fontSize: isMobile ? '24px' : '28px'}}>☁️</span>
          )}
        </div>
        <h3 style={{
          ...styles.uploadTitle,
          fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px'
        }}>
          {files.length > 0 ? 'Files Selected' : 'Drop your CSV files here'}
        </h3>
        <p style={{
          ...styles.uploadText,
          fontSize: isMobile ? '14px' : '16px'
        }}>
          {files.length > 0
            ? `${files.length}/4 files selected`
            : 'or click to browse'
          }
        </p>
        <div style={{
          ...styles.uploadRequirements,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '8px' : '24px'
        }}>
          <span style={{
            ...styles.requirement,
            fontSize: isMobile ? '12px' : '14px',
            padding: isMobile ? '6px 12px' : '8px 16px'
          }}>📋 Exactly 4 CSV files</span>
          <span style={{
            ...styles.requirement,
            fontSize: isMobile ? '12px' : '14px',
            padding: isMobile ? '6px 12px' : '8px 16px'
          }}>📊 .csv format only</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadArea;
