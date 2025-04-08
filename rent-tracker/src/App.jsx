import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import AddTenant from './pages/AddTenant';
import TenantDetails from './pages/TenantDetails';
import Payments from './pages/Payments';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const ColorModeButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

function App() {
  // Get initial mode from localStorage or default to light
  const [mode, setMode] = React.useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode);
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2563eb' : '#3b82f6',
            light: mode === 'light' ? '#60a5fa' : '#60a5fa',
            dark: mode === 'light' ? '#1e40af' : '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: mode === 'light' ? '#7c3aed' : '#8b5cf6',
            light: mode === 'light' ? '#a78bfa' : '#a855f7',
            dark: mode === 'light' ? '#5b21b6' : '#7c3aed',
            contrastText: '#ffffff',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#1f2937',
            paper: mode === 'light' ? '#ffffff' : '#111827',
          },
          success: {
            main: mode === 'light' ? '#059669' : '#10b981',
            light: mode === 'light' ? '#34d399' : '#34d399',
            dark: mode === 'light' ? '#065f46' : '#059669',
          },
          warning: {
            main: mode === 'light' ? '#d97706' : '#f97316',
            light: mode === 'light' ? '#fbbf24' : '#fbbf24',
            dark: mode === 'light' ? '#92400e' : '#d97706',
          },
          text: {
            primary: mode === 'light' ? '#1e293b' : '#f3f4f6',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
        },
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 600 },
          h2: { fontWeight: 600 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
      }),
    [mode],
  );

  React.useEffect(() => {
    // Update the document's class based on theme mode
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="tenants" element={<Tenants />} />
                <Route path="tenants/add" element={<AddTenant />} />
                <Route path="tenants/:id" element={<TenantDetails />} />
                <Route path="payments" element={<Payments />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
