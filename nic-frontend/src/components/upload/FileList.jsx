import React from 'react';

const FileList = ({ styles, files, isValidSelection, formatFileSize, isMobile, isTablet }) => {
  if (files.length === 0) return null;

  return (
    <div style={{
      ...styles.fileList,
      padding: isMobile ? '16px' : '24px'
    }}>
      <div style={{
        ...styles.fileListHeader,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '8px' : '0'
      }}>
        <span style={{
          ...styles.fileListTitle,
          fontSize: isMobile ? '16px' : '18px'
        }}>📁 Selected Files ({files.length}/4)</span>
        {isValidSelection && (
          <span style={{
            ...styles.validBadge,
            fontSize: isMobile ? '10px' : '12px',
            padding: isMobile ? '4px 8px' : '6px 12px'
          }}>✅ Valid Selection</span>
        )}
      </div>
      <div style={{
        ...styles.fileGrid,
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: isMobile ? '8px' : '12px'
      }}>
        {files.map((file, idx) => (
          <div key={idx} style={{
            ...styles.fileCard,
            padding: isMobile ? '12px' : '16px'
          }}>
            <div style={styles.fileCardHeader}>
              <span style={{
                ...styles.fileIcon,
                fontSize: isMobile ? '16px' : '20px'
              }}>📄</span>
              <span style={{
                ...styles.fileName,
                fontSize: isMobile ? '12px' : '14px'
              }}>{file.name}</span>
            </div>
            <div style={styles.fileDetails}>
              <span style={{
                ...styles.fileSize,
                fontSize: isMobile ? '10px' : '12px'
              }}>{formatFileSize(file.size)}</span>
              <span style={{
                ...styles.fileType,
                fontSize: isMobile ? '8px' : '10px',
                padding: isMobile ? '1px 6px' : '2px 8px'
              }}>CSV</span>
            </div>
          </div>
        ))}
      </div>
      {!isValidSelection && (
        <div style={{
          ...styles.warningCard,
          padding: isMobile ? '8px 12px' : '12px 16px'
        }}>
          <span style={{
            ...styles.warningIcon,
            fontSize: isMobile ? '14px' : '16px'
          }}>⚠️</span>
          <span style={{
            ...styles.warningText,
            fontSize: isMobile ? '12px' : '14px'
          }}>Need exactly 4 CSV files to proceed</span>
        </div>
      )}
    </div>
  );
};

export default FileList;
