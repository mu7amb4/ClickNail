import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import ManicuristDashboard from './pages/ManicuristDashboard';
import ClientRegistration from './pages/ClientRegistration';

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
        <Router>
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/manicurist" element={<ManicuristDashboard />} />
            <Route path="/register" element={<ClientRegistration />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 