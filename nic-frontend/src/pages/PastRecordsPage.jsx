import React, { useEffect, useState } from 'react';
import dashboardApi from '../services/dashboardApi';
import {
  Box, Typography, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, Stack, TablePagination, Chip, TextField, InputAdornment,
  IconButton, Tooltip, Fade, Slide
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';

const PastRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [exporting, setExporting] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const res = await dashboardApi.get('/dashboard/records');
        setRecords(res.data);
        setFilteredRecords(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Failed to load records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter(record =>
        record.nicNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
      setPage(0); // Reset to first page when searching
    }
  }, [searchTerm, records]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToCSV = async () => {
    setExporting('csv');
    try {
      const ws = XLSX.utils.json_to_sheet(filteredRecords);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Records');
      XLSX.writeFile(wb, `nic_records_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting('');
  };

  const exportToExcel = async () => {
    setExporting('excel');
    try {
      const ws = XLSX.utils.json_to_sheet(filteredRecords);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Records');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, `nic_records_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting('');
  };

  const exportToPDF = async () => {
    setExporting('pdf');
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text('NIC Records Report', 14, 15);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
      doc.text(`Total Records: ${filteredRecords.length}`, 14, 32);

      const tableColumn = ["NIC Number", "Birthday", "Age", "Gender", "File", "Created At"];
      const tableRows = [];

      filteredRecords.forEach(record => {
        tableRows.push([
          record.nicNumber,
          record.birthday,
          record.age,
          record.gender,
          record.fileName,
          new Date(record.createdAt).toLocaleDateString()
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [51, 65, 85] },
        alternateRowStyles: { fillColor: [248, 250, 252] },
      });

      doc.save(`nic_records_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const paginatedRecords = filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}>⟳</div>
            <h2 style={styles.loadingText}>Loading Records...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={styles.wrapper}>
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <h2 style={styles.errorTitle}>Unable to Load Records</h2>
            <p style={styles.errorText}>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>
              <span style={styles.iconEmoji}>📄</span>
            </div>
            <h1 style={styles.title}>Past Records</h1>
            <p style={styles.subtitle}>
              View and export your NIC processing history
            </p>
            <Chip
              label={`${filteredRecords.length} Total Records`}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                fontWeight: '600',
                fontSize: '14px',
                mt: 2
              }}
            />
          </div>

          {/* Controls Section */}
          <div style={styles.controlsSection}>
            <div style={styles.searchSection}>
              <h3 style={styles.sectionTitle}>🔍 Search & Filter</h3>
              <TextField
                placeholder="Search by NIC, Gender, or File name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    fontSize: '16px',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </div>

            <div style={styles.exportSection}>
              <h3 style={styles.sectionTitle}>📊 Export Options</h3>
              <div style={styles.exportButtons}>
                <Tooltip title="Export as PDF">
                  <button
                    onClick={exportToPDF}
                    disabled={exporting === 'pdf'}
                    style={{
                      ...styles.exportButton,
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      ...(exporting === 'pdf' ? styles.exportingButton : {})
                    }}
                  >
                    {exporting === 'pdf' ? (
                      <span style={styles.spinner}>⟳</span>
                    ) : (
                      <PictureAsPdfIcon />
                    )}
                    PDF
                  </button>
                </Tooltip>

                <Tooltip title="Export as Excel">
                  <button
                    onClick={exportToExcel}
                    disabled={exporting === 'excel'}
                    style={{
                      ...styles.exportButton,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      ...(exporting === 'excel' ? styles.exportingButton : {})
                    }}
                  >
                    {exporting === 'excel' ? (
                      <span style={styles.spinner}>⟳</span>
                    ) : (
                      <TableViewIcon />
                    )}
                    Excel
                  </button>
                </Tooltip>

                <Tooltip title="Export as CSV">
                  <button
                    onClick={exportToCSV}
                    disabled={exporting === 'csv'}
                    style={{
                      ...styles.exportButton,
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      ...(exporting === 'csv' ? styles.exportingButton : {})
                    }}
                  >
                    {exporting === 'csv' ? (
                      <span style={styles.spinner}>⟳</span>
                    ) : (
                      <GetAppIcon />
                    )}
                    CSV
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div style={styles.tableSection}>
            <div style={styles.tableSectionHeader}>
              <h3 style={styles.sectionTitle}>📋 Records Table</h3>
              <Chip
                label={`Showing ${paginatedRecords.length} of ${filteredRecords.length}`}
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  fontWeight: '600'
                }}
              />
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["NIC Number", "Date of Birth", "Age", "Gender", "Source File", "Created At"].map((col) => (
                      <th key={col} style={styles.th}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((record, idx) => (
                    <Fade in={true} timeout={300 + idx * 50} key={record.nicNumber || idx}>
                      <tr style={styles.tr}>
                        <td style={styles.td}>
                          <span style={styles.nicNumber}>{record.nicNumber}</span>
                        </td>
                        <td style={styles.td}>{record.birthday}</td>
                        <td style={styles.td}>
                          <span style={styles.age}>{record.age}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={record.gender === 'Male' ? styles.maleTag : styles.femaleTag}>
                            {record.gender}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.fileName}>{record.fileName}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.dateTime}>{formatDate(record.createdAt)}</span>
                        </td>
                      </tr>
                    </Fade>
                  ))}
                </tbody>
              </table>

              {filteredRecords.length === 0 && (
                <div style={styles.noResults}>
                  <span style={styles.noResultsIcon}>📭</span>
                  <h3 style={styles.noResultsTitle}>No Records Found</h3>
                  <p style={styles.noResultsText}>
                    {searchTerm ? 'Try adjusting your search terms' : 'No records available'}
                  </p>
                </div>
              )}
            </div>

            {/* Enhanced Pagination */}
            {filteredRecords.length > 0 && (
              <div style={styles.paginationContainer}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={filteredRecords.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    color: '#1e293b',
                    fontWeight: '500',
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                      fontWeight: '600',
                    },
                    '& .MuiTablePagination-select': {
                      fontWeight: '600',
                    },
                    '& .MuiIconButton-root': {
                      color: '#1e293b',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }

        /* Table hover effects */
        tbody tr {
          transition: all 0.3s ease;
        }

        tbody tr:hover {
          background-color: rgba(59, 130, 246, 0.05) !important;
          transform: scale(1.01);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fade-in-up {
            animation: fadeInUp 0.4s ease-out;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: `
      linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.85) 25%, rgba(51, 65, 85, 0.8) 50%, rgba(71, 85, 105, 0.75) 75%, rgba(100, 116, 139, 0.7) 100%),
      url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '100px 20px 40px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    maxWidth: '1400px',
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
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'white',
  },
  spinner: {
    fontSize: '24px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
    display: 'inline-block',
  },
  loadingText: {
    fontSize: '24px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: 'white',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  errorTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 16px 0',
  },
  errorText: {
    fontSize: '16px',
    opacity: 0.8,
    maxWidth: '400px',
  },
  controlsSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '32px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  searchSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  exportSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 20px 0',
    letterSpacing: '-0.5px',
  },
  exportButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    }
  },
  exportingButton: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  tableSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  tableSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(15px)',
    marginBottom: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
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
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '16px 12px',
    color: '#374151',
    fontWeight: '500',
    verticalAlign: 'middle',
  },
  nicNumber: {
    fontFamily: 'Monaco, Consolas, monospace',
    background: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e293b',
  },
  age: {
    background: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  maleTag: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  femaleTag: {
    background: '#fce7f3',
    color: '#be185d',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  fileName: {
    color: '#64748b',
    fontSize: '13px',
    fontStyle: 'italic',
  },
  dateTime: {
    color: '#64748b',
    fontSize: '12px',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  noResultsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  noResultsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  noResultsText: {
    fontSize: '16px',
    color: '#64748b',
    margin: 0,
  },
  paginationContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
};

export default PastRecordsPage;
