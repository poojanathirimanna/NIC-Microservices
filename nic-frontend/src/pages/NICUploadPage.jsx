import React, { useState } from 'react';
import { uploadNICFiles } from '../services/nicService';
import Navbar from '../components/Navbar';

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
      setError('⚠️ Please upload exactly 4 CSV files.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await uploadNICFiles(files, token);
      setResults(response.records || []);
      setResponseInfo(response);
      setError('');
    } catch (err) {
      setError('❌ Upload failed. Please try again.');
      console.error(err);
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
              <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>{responseInfo.message}</p>
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
    marginBottom: '20px',
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
  },
  button: {
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
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
    color: '#ff5252',
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
