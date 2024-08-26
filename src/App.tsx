import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import GlobalLoader from './GlobalLoader';
import AuthProvider from './Utils/AuthProvider';
import LoginForm from './Auth/LoginForm';
import Home from './Home/Home';
import useAuth from './Utils/useAuth';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <GlobalLoader />
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout: React.FC = () => {
  const isAuthenticated = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ display: 'flex' }}>
          <Navbar onLogout={() => { /* Implement logout logic */ }} />
          <Sidebar />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: 30, mt: 8 }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
