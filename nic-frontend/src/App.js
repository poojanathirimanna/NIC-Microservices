import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // ✅ Add Navigate
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import NICUploadPage from './pages/NICUploadPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect base path to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />


        {/* 🔒 Protected NIC Upload Route */}
        <Route
          path="/upload-nic"
          element={
            <ProtectedRoute>
              <NICUploadPage />
            </ProtectedRoute>
          }
        />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
