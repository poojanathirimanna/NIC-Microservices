import React from 'react';

const ResultsTable = ({ styles, results }) => {
  if (results.length === 0) return null;

  return (
    <div style={styles.resultsSection}>
      <div style={styles.resultsHeader}>
        <span style={styles.resultsIcon}>📋</span>
        <h3 style={styles.resultsTitle}>Validation Results</h3>
        <span style={styles.resultsBadge}>{results.length} Records</span>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>NIC Number</th>
              <th style={styles.th}>Date of Birth</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Source File</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx} style={styles.tr}>
                <td style={styles.td}>{r.nicNumber}</td>
                <td style={styles.td}>{r.birthday}</td>
                <td style={styles.td}>{r.age}</td>
                <td style={{...styles.td, ...styles.genderCell}}>
                  <span style={r.gender === 'Male' ? styles.maleTag : styles.femaleTag}>
                    {r.gender}
                  </span>
                </td>
                <td style={styles.td}>{r.fileName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
