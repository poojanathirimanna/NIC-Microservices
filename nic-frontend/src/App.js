import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import NICUploadPage from './pages/NICUploadPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔒 Protected Home Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <h1>Home Page</h1> {/* You can replace with <HomePage /> if needed */}
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
