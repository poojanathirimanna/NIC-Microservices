import React from 'react';

const FileUploadArea = ({
  styles,
  dragActive,
  files,
  handleDrag,
  handleDrop,
  fileInputRef
}) => {
  return (
    <div
      style={{
        ...styles.uploadArea,
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
        <div style={styles.uploadIcon}>
          {files.length > 0 ? (
            <span style={styles.uploadIconEmoji}>✅</span>
          ) : (
            <span style={styles.uploadIconEmoji}>☁️</span>
          )}
        </div>
        <h3 style={styles.uploadTitle}>
          {files.length > 0 ? 'Files Selected' : 'Drop your CSV files here'}
        </h3>
        <p style={styles.uploadText}>
          {files.length > 0
            ? `${files.length}/4 files selected`
            : 'or click to browse'
          }
        </p>
        <div style={styles.uploadRequirements}>
          <span style={styles.requirement}>📋 Exactly 4 CSV files</span>
          <span style={styles.requirement}>📊 .csv format only</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadArea;
