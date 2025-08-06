import React, { useState } from 'react';
import { uploadNICFiles } from '../services/nicService';

const NICUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [responseInfo, setResponseInfo] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length !== 4) {
      setError('Please upload exactly 4 CSV files.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await uploadNICFiles(files, token);
      setResults(response.records || []);
      setResponseInfo(response);
      setError('');
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📂 NIC CSV Upload</h1>

      <input
        type="file"
        multiple
        accept=".csv"
        onChange={handleFileChange}
        style={styles.input}
      />

      <button onClick={handleUpload} style={styles.button}>
        ✅ Upload and Validate
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {responseInfo && (
        <div style={styles.summary}>
          <p style={{ color: 'green' }}>✔️ {responseInfo.message}</p>
          <p><strong>Files Processed:</strong> {responseInfo.filesProcessed}</p>
          <p><strong>Inserted:</strong> {responseInfo.inserted}</p>
          <p><strong>Skipped:</strong> {responseInfo.skipped}</p>
          {responseInfo.skippedNICs.length > 0 && (
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
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{r.nicNumber}</td>
                  <td style={styles.td}>{r.birthday}</td>
                  <td style={styles.td}>{r.age}</td>
                  <td style={styles.td}>{r.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 0 16px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#00A5B8',
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
  },
  error: {
    color: '#8B0000',
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '10px',
  },
  summary: {
    marginTop: '20px',
    lineHeight: '1.6',
    fontSize: '15px',
  },
  skipped: {
    color: 'red',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: '30px',
    overflowX: 'auto',
  },
  resultTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#222',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '16px',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  th: {
    padding: '12px',
    backgroundColor: '#004080',
    color: '#fff',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    backgroundColor: '#f5f8ff',
  },
};

export default NICUploadPage;
