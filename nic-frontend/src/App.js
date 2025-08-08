import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import NICUploadPage from './pages/NICUploadPage';
import DashboardPage from './pages/DashboardPage';
import PastRecordsPage from './pages/PastRecordsPage'; // ✅ imported

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/upload-nic"
          element={
            <ProtectedRoute>
              <NICUploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/past-records"
          element={
            <ProtectedRoute>
              <PastRecordsPage />
            </ProtectedRoute>
          }
        />

        {/* 🔓 Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
