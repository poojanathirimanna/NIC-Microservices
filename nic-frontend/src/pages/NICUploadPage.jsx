import React, { useState, useMemo, useRef } from 'react';
import { uploadNICFiles } from '../services/nicService';
import Navbar from '../components/Navbar';
import UploadHeader from '../components/upload/UploadHeader';
import FileUploadArea from '../components/upload/FileUploadArea';
import FileList from '../components/upload/FileList';
import ActionButtons from '../components/upload/ActionButtons';
import ErrorMessage from '../components/upload/ErrorMessage';
import ProcessingSummary from '../components/upload/ProcessingSummary';
import ResultsTable from '../components/upload/ResultsTable';

const NICUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [responseInfo, setResponseInfo] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Helper: check exactly 4 CSV files selected
  const isValidSelection = useMemo(() => {
    if (files.length !== 4) return false;
    return files.every(
      (f) =>
        f.name.toLowerCase().endsWith('.csv') ||
        f.type === 'text/csv' ||
        f.type === 'application/vnd.ms-excel'
    );
  }, [files]);

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files || []);
    const onlyCsv = picked.filter(
      (f) =>
        f.name.toLowerCase().endsWith('.csv') ||
        f.type === 'text/csv' ||
        f.type === 'application/vnd.ms-excel'
    );
    setFiles(onlyCsv);

    if (picked.length !== 4) {
      setError('Please select exactly 4 files.');
    } else if (onlyCsv.length !== 4) {
      setError('All 4 files must be CSV (.csv).');
    } else {
      setError('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const onlyCsv = droppedFiles.filter(
        (f) =>
          f.name.toLowerCase().endsWith('.csv') ||
          f.type === 'text/csv' ||
          f.type === 'application/vnd.ms-excel'
      );
      setFiles(onlyCsv);

      if (droppedFiles.length !== 4) {
        setError('Please select exactly 4 files.');
      } else if (onlyCsv.length !== 4) {
        setError('All 4 files must be CSV (.csv).');
      } else {
        setError('');
      }
    }
  };

  const handleUpload = async () => {
    if (!isValidSelection) {
      setError('Please upload exactly 4 CSV files.');
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await uploadNICFiles(files, token);

      setResults(response?.records || []);
      setResponseInfo({
        message: response?.message || 'Upload completed.',
        filesProcessed: response?.filesProcessed ?? files.length,
        inserted: response?.inserted ?? 0,
        skipped: response?.skipped ?? 0,
        skippedNICs: response?.skippedNICs || [],
      });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    }
    setIsUploading(false);
  };

  const handleClear = () => {
    setFiles([]);
    setResults([]);
    setResponseInfo(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const RotatingBackground = () => (
    <div style={{
      position: 'fixed',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '250%',
      backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      animation: 'slowRotate 300s linear infinite',
      zIndex: -5,
    }} />
  );

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <RotatingBackground />
        <div style={styles.container}>
          {/* Header Section */}
          <UploadHeader styles={styles} />

          {/* Upload Section */}
          <div style={styles.uploadSection}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,text/csv"
              onChange={handleFileChange}
              style={styles.hiddenInput}
            />

            <FileUploadArea
              styles={styles}
              dragActive={dragActive}
              files={files}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              fileInputRef={fileInputRef}
            />

            <FileList
              styles={styles}
              files={files}
              isValidSelection={isValidSelection}
              formatFileSize={formatFileSize}
            />

            <ActionButtons
              styles={styles}
              handleUpload={handleUpload}
              handleClear={handleClear}
              isValidSelection={isValidSelection}
              isUploading={isUploading}
            />

            <ErrorMessage
              styles={styles}
              error={error}
            />
          </div>

          <ProcessingSummary
            styles={styles}
            responseInfo={responseInfo}
          />

          <ResultsTable
            styles={styles}
            results={results}
          />
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        /* Slow Rotating Background Animation */
        @keyframes slowRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }

        /* Hover Effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fade-in-up {
            animation: fadeInUp 0.4s ease-out;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .slowRotate {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 25%, rgba(51, 65, 85, 0.8) 50%, rgba(71, 85, 105, 0.75) 75%, rgba(100, 116, 139, 0.7) 100%)`,
    padding: '100px 20px 40px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1000px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
  },
  headerIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  iconEmoji: {
    fontSize: '36px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    letterSpacing: '-1px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.9,
    margin: 0,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  uploadSection: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  uploadArea: {
    border: '3px dashed #cbd5e1',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: '#f8fafc',
    marginBottom: '24px',
  },
  uploadAreaActive: {
    borderColor: '#3b82f6',
    background: '#eff6ff',
    transform: 'scale(1.02)',
  },
  uploadAreaWithFiles: {
    borderColor: '#10b981',
    background: '#f0fdf4',
  },
  hiddenInput: {
    display: 'none',
  },
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  uploadIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
  },
  uploadIconEmoji: {
    fontSize: '28px',
  },
  uploadTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  uploadText: {
    fontSize: '16px',
    color: '#64748b',
    margin: 0,
  },
  uploadRequirements: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  requirement: {
    fontSize: '14px',
    color: '#475569',
    background: 'rgba(51, 65, 85, 0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: '500',
  },
  fileList: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
  },
  fileListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  fileListTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  validBadge: {
    background: '#10b981',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  },
  fileCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    }
  },
  fileCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  fileIcon: {
    fontSize: '20px',
  },
  fileName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  },
  fileDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: '12px',
    color: '#64748b',
  },
  fileType: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: '600',
  },
  warningCard: {
    background: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  warningIcon: {
    fontSize: '16px',
  },
  warningText: {
    color: '#92400e',
    fontSize: '14px',
    fontWeight: '500',
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
    }
  },
  secondaryButton: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)',
    }
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
    }
  },
  loadingButton: {
    opacity: 0.8,
  },
  buttonIcon: {
    fontSize: '16px',
  },
  spinner: {
    fontSize: '16px',
    animation: 'spin 1s linear infinite',
  },
  errorCard: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'shake 0.5s ease-in-out',
  },
  errorIcon: {
    fontSize: '20px',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: '500',
  },
  summarySection: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  summaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  summaryIcon: {
    fontSize: '24px',
  },
  summaryTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  summaryCard: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    }
  },
  summaryCardIcon: {
    fontSize: '32px',
  },
  summaryCardLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  summaryCardValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
  },
  successMessage: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  successIcon: {
    fontSize: '20px',
  },
  successText: {
    color: '#15803d',
    fontSize: '16px',
    fontWeight: '600',
  },
  skippedSection: {
    background: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '12px',
    padding: '16px 20px',
  },
  skippedTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#92400e',
    margin: '0 0 12px 0',
  },
  skippedList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skippedItem: {
    background: '#fed7aa',
    color: '#9a3412',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },
  resultsSection: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  resultsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  resultsIcon: {
    fontSize: '24px',
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    flex: 1,
  },
  resultsBadge: {
    background: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    backgroundColor: 'white',
  },
  th: {
    padding: '16px 12px',
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    color: 'white',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    letterSpacing: '0.5px',
    borderBottom: 'none',
  },
  tr: {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f8fafc',
    }
  },
  td: {
    padding: '16px 12px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: '#222',
    border: '1px solid #ddd',
  },
};

export default NICUploadPage;
