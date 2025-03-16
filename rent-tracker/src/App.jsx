import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tenants, { TenantsProvider } from './pages/Tenants';
import AddTenant from './pages/AddTenant';
import TenantDetails from './pages/TenantDetails';
import Payments from './pages/Payments';
import { PaymentsProvider } from './contexts/PaymentsContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <TenantsProvider>
          <PaymentsProvider>
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
          </PaymentsProvider>
        </TenantsProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
