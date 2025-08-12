import React, { useState, useMemo } from 'react';
import { uploadNICFiles } from '../services/nicService';
import Navbar from '../components/Navbar';

const NICUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [responseInfo, setResponseInfo] = useState(null);
  const [error, setError] = useState('');

  // Helper: check exactly 4 CSV files selected
  const isValidSelection = useMemo(() => {
    if (files.length !== 4) return false;
    // Accept both ".csv" and "text/csv" types (browsers differ)
    return files.every(
      (f) =>
        f.name.toLowerCase().endsWith('.csv') ||
        f.type === 'text/csv' ||
        f.type === 'application/vnd.ms-excel' // some browsers mark CSV like this
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
      setError('⚠️ Please select exactly 4 files.');
    } else if (onlyCsv.length !== 4) {
      setError('⚠️ All 4 files must be CSV (.csv).');
    } else {
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!isValidSelection) {
      setError('⚠️ Please upload exactly 4 CSV files.');
      return;
    }

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
      setError('❌ Upload failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>📂 NIC CSV Upload</h1>

          <input
            type="file"
            multiple
            accept=".csv,text/csv"
            onChange={handleFileChange}
            style={styles.input}
          />

          {/* Selected files list */}
          {files.length > 0 && (
            <div style={styles.fileList}>
              <p style={{ margin: 0 }}>
                <strong>📂 Files Selected ({files.length}/4):</strong>
              </p>
              <ul style={styles.fileUl}>
                {files.map((file, idx) => (
                  <li key={idx} style={styles.fileItem}>
                    {file.name}
                  </li>
                ))}
              </ul>
              {!isValidSelection && (
                <p style={{ ...styles.error, marginTop: 8 }}>
                  ⚠️ Need exactly 4 CSV files.
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleUpload}
            style={{
              ...styles.button,
              opacity: isValidSelection ? 1 : 0.6,
              cursor: isValidSelection ? 'pointer' : 'not-allowed',
            }}
            disabled={!isValidSelection}
          >
            ✅ Upload and Validate
          </button>

          {error && <p style={styles.error}>{error}</p>}

          {responseInfo && (
            <div style={styles.summary}>
              <p style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: 0 }}>
                {responseInfo.message}
              </p>
              <p style={{ margin: '6px 0' }}>
                <strong>Files Processed:</strong> {responseInfo.filesProcessed}
              </p>
              <p style={{ margin: '6px 0' }}>
                <strong>Inserted:</strong> {responseInfo.inserted}
              </p>
              <p style={{ margin: '6px 0' }}>
                <strong>Skipped:</strong> {responseInfo.skipped}
              </p>
              {responseInfo.skippedNICs?.length > 0 && (
                <p style={styles.skipped}>
                  <strong>Skipped NICs:</strong> {responseInfo.skippedNICs.join(', ')}
                </p>
              )}
            </div>
          )}

          {results.length > 0 && (
            <div style={styles.tableContainer}>
              <h2 style={styles.resultTitle}>📊 Validation Results</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>NIC</th>
                    <th style={styles.th}>DOB</th>
                    <th style={styles.th}>Age</th>
                    <th style={styles.th}>Gender</th>
                    <th style={styles.th}>File Name</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{r.nicNumber}</td>
                      <td style={styles.td}>{r.birthday}</td>
                      <td style={styles.td}>{r.age}</td>
                      <td style={styles.td}>{r.gender}</td>
                      <td style={styles.td}>{r.fileName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #667eea, #764ba2)',
    padding: '80px 20px 40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  card: {
    maxWidth: '900px',
    width: '100%',
    padding: '40px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
    backdropFilter: 'blur(12px)',
    color: '#fff',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
  },
  input: {
    marginBottom: '12px',
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    color: '#222',
  },
  fileList: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '10px 12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  fileUl: {
    margin: '6px 0 0 18px',
  },
  fileItem: {
    color: '#fff',
    listStyleType: 'disc',
    margin: '4px 0',
    wordBreak: 'break-all',
  },
  button: {
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    transition: '0.3s ease',
    marginBottom: '20px',
  },
  error: {
    color: '#ff4d4f',
    backgroundColor: '#fff0f0',
    padding: '10px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  summary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '15px 20px',
    marginTop: '20px',
    fontSize: '15px',
  },
  skipped: {
    color: '#ffb4b4',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  tableContainer: {
    marginTop: '30px',
    overflowX: 'auto',
  },
  resultTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  th: {
    padding: '14px',
    backgroundColor: '#004080',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: '#222',
    border: '1px solid #ddd',
  },
};

export default NICUploadPage;
