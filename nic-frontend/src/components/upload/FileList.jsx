import React from 'react';

const FileList = ({ styles, files, isValidSelection, formatFileSize }) => {
  if (files.length === 0) return null;

  return (
    <div style={styles.fileList}>
      <div style={styles.fileListHeader}>
        <span style={styles.fileListTitle}>📁 Selected Files ({files.length}/4)</span>
        {isValidSelection && (
          <span style={styles.validBadge}>✅ Valid Selection</span>
        )}
      </div>
      <div style={styles.fileGrid}>
        {files.map((file, idx) => (
          <div key={idx} style={styles.fileCard}>
            <div style={styles.fileCardHeader}>
              <span style={styles.fileIcon}>📄</span>
              <span style={styles.fileName}>{file.name}</span>
            </div>
            <div style={styles.fileDetails}>
              <span style={styles.fileSize}>{formatFileSize(file.size)}</span>
              <span style={styles.fileType}>CSV</span>
            </div>
          </div>
        ))}
      </div>
      {!isValidSelection && (
        <div style={styles.warningCard}>
          <span style={styles.warningIcon}>⚠️</span>
          <span style={styles.warningText}>Need exactly 4 CSV files to proceed</span>
        </div>
      )}
    </div>
  );
};

export default FileList;
