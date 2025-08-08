import React, { useEffect, useState } from 'react';
import dashboardApi from '../services/dashboardApi';
import {
  Box, Typography, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper, Stack, TablePagination
} from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';

const PastRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // ✅ default page size

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await dashboardApi.get('/dashboard/records');
        setRecords(res.data);
      } catch (err) {
        console.error('Error fetching records:', err);
      }
    };

    fetchRecords();
  }, []);

  // 🔄 Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 🔄 Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');
    XLSX.writeFile(wb, 'records.csv');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'records.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["NIC Number", "Birthday", "Age", "Gender", "File", "Created At"];
    const tableRows = [];

    records.forEach(record => {
      tableRows.push([
        record.nicNumber,
        record.birthday,
        record.age,
        record.gender,
        record.fileName,
        record.createdAt
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('records.pdf');
  };

  // ✅ Slice only the visible records for current page
  const paginatedRecords = records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: 10,
          px: 4,
          pb: 4,
          minHeight: '100vh',
          background: 'linear-gradient(to right, #3f51b5, #5a55ae)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold" sx={{ fontSize: '2rem' }}>
          📄 Past Records
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#4caf50' }}
            onClick={exportToPDF}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#e91e63' }}
            onClick={exportToCSV}
          >
            Download CSV
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#00bcd4' }}
            onClick={exportToExcel}
          >
            Download Excel
          </Button>
        </Stack>

        <Paper sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{ backgroundColor: '#3949ab' }}>
                <TableRow>
                  {["NIC", "Birthday", "Age", "Gender", "File", "Created At"].map((col) => (
                    <TableCell key={col} sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRecords.map((rec, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    sx={{ '&:hover': { backgroundColor: '#e8eaf6' } }}
                  >
                    <TableCell>{rec.nicNumber}</TableCell>
                    <TableCell>{rec.birthday}</TableCell>
                    <TableCell>{rec.age}</TableCell>
                    <TableCell>{rec.gender}</TableCell>
                    <TableCell>{rec.fileName}</TableCell>
                    <TableCell>{rec.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ✅ Pagination Control */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={records.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: '#eeeeee',
              color: '#333',
              fontWeight: 'bold',
              borderTop: '1px solid #ccc',
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default PastRecordsPage;
