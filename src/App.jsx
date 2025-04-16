import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import ManicuristDashboard from './pages/ManicuristDashboard';
import ClientRegistration from './pages/ClientRegistration';
import PrivateRoute from './components/PrivateRoute';
import AuthService from './services/auth';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E91E63', // Rosa vibrante
    },
    secondary: {
      main: '#00BFA5', // Verde água
    },
    background: {
      default: '#13111C', // Fundo escuro
      paper: '#1A1825', // Papel um pouco mais claro
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <CssBaseline />
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<ClientRegistration />} />
            <Route
              path="/client"
              element={
                <PrivateRoute>
                  <ClientDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/manicurist"
              element={
                <PrivateRoute>
                  <ManicuristDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 