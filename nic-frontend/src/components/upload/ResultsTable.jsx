import React from 'react';

const ResultsTable = ({ styles, results, isMobile, isTablet }) => {
  if (results.length === 0) return null;

  return (
    <div style={{
      ...styles.resultsSection,
      padding: isMobile ? '20px' : '32px'
    }}>
      <div style={{
        ...styles.resultsHeader,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            ...styles.resultsIcon,
            fontSize: isMobile ? '20px' : '24px'
          }}>📋</span>
          <h3 style={{
            ...styles.resultsTitle,
            fontSize: isMobile ? '20px' : '24px'
          }}>Validation Results</h3>
        </div>
        <span style={{
          ...styles.resultsBadge,
          fontSize: isMobile ? '12px' : '14px',
          padding: isMobile ? '6px 12px' : '8px 16px'
        }}>{results.length} Records</span>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '12px'
        }}>
          {results.map((r, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '8px'
              }}>
                <span style={{
                  fontFamily: 'Monaco, Consolas, monospace',
                  background: '#f1f5f9',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>{r.nicNumber}</span>
                <span style={{
                  background: r.gender === 'Male' ? '#dbeafe' : '#fce7f3',
                  color: r.gender === 'Male' ? '#1e40af' : '#be185d',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '600'
                }}>{r.gender}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Birthday:</span>
                  <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>{r.birthday}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Age:</span>
                  <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>{r.age}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>File:</span>
                  <span style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>{r.fileName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{
                  ...styles.th,
                  fontSize: isTablet ? '12px' : '14px',
                  padding: isTablet ? '12px 8px' : '16px 12px'
                }}>NIC Number</th>
                <th style={{
                  ...styles.th,
                  fontSize: isTablet ? '12px' : '14px',
                  padding: isTablet ? '12px 8px' : '16px 12px'
                }}>Date of Birth</th>
                <th style={{
                  ...styles.th,
                  fontSize: isTablet ? '12px' : '14px',
                  padding: isTablet ? '12px 8px' : '16px 12px'
                }}>Age</th>
                <th style={{
                  ...styles.th,
                  fontSize: isTablet ? '12px' : '14px',
                  padding: isTablet ? '12px 8px' : '16px 12px'
                }}>Gender</th>
                <th style={{
                  ...styles.th,
                  fontSize: isTablet ? '12px' : '14px',
                  padding: isTablet ? '12px 8px' : '16px 12px'
                }}>Source File</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={{
                    ...styles.td,
                    padding: isTablet ? '12px 8px' : '16px 12px',
                    fontSize: isTablet ? '12px' : '14px'
                  }}>{r.nicNumber}</td>
                  <td style={{
                    ...styles.td,
                    padding: isTablet ? '12px 8px' : '16px 12px',
                    fontSize: isTablet ? '12px' : '14px'
                  }}>{r.birthday}</td>
                  <td style={{
                    ...styles.td,
                    padding: isTablet ? '12px 8px' : '16px 12px',
                    fontSize: isTablet ? '12px' : '14px'
                  }}>{r.age}</td>
                  <td style={{
                    ...styles.td,
                    padding: isTablet ? '12px 8px' : '16px 12px'
                  }}>
                    <span style={{
                      background: r.gender === 'Male' ? '#dbeafe' : '#fce7f3',
                      color: r.gender === 'Male' ? '#1e40af' : '#be185d',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: isTablet ? '10px' : '12px',
                      fontWeight: '600'
                    }}>
                      {r.gender}
                    </span>
                  </td>
                  <td style={{
                    ...styles.td,
                    padding: isTablet ? '12px 8px' : '16px 12px',
                    fontSize: isTablet ? '11px' : '12px',
                    fontStyle: 'italic'
                  }}>{r.fileName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
