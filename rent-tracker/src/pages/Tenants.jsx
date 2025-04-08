import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  TextField,
  MenuItem,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Visibility as ViewIcon,
  Check as CheckIcon,
  Money as MoneyIcon,
  MoneyOff as MoneyOffIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

// Initial tenant data
const initialTenants = [
  // Arepally Chicken Center
  {
    id: 1,
    name: 'Arepally Chicken Center',
    location: 'Arepally Chicken Center',
    rentAmount: 5500,
    notes: '',
  },
  // Gandhi Nagar
  {
    id: 2,
    name: 'Gandhi Nagar Property 1',
    location: 'Gandhi Nagar',
    rentAmount: 5500,
    notes: '',
  },
  {
    id: 3,
    name: 'Gandhi Nagar Property 2',
    location: 'Gandhi Nagar',
    rentAmount: 8000,
    notes: '18th due date',
  },
  {
    id: 4,
    name: 'Gandhi Nagar Property 3',
    location: 'Gandhi Nagar',
    rentAmount: 5500,
    notes: '',
  },
  {
    id: 5,
    name: 'Gandhi Nagar Property 4',
    location: 'Gandhi Nagar',
    rentAmount: 10000,
    notes: '1st due date',
  },
  // Court Area
  {
    id: 6,
    name: 'Court Property 1',
    location: 'Court',
    rentAmount: 18500,
    notes: '5th due date',
  },
  {
    id: 7,
    name: 'Court Property 2',
    location: 'Court',
    rentAmount: 2000,
    notes: 'Collected by Sridhar',
  },
  // Watch Tower Center
  {
    id: 8,
    name: 'Watch Tower Main',
    location: 'Watch Tower Center',
    rentAmount: 14000,
    notes: '10th due date',
  },
  {
    id: 9,
    name: 'Watch Tower Property 1',
    location: 'Watch Tower Center',
    rentAmount: 4500,
  },
  {
    id: 10,
    name: 'Watch Tower Property 2',
    location: 'Watch Tower Center',
    rentAmount: 2000,
  },
  {
    id: 11,
    name: 'Penthouse',
    location: 'Watch Tower Center',
    rentAmount: 1000,
    notes: 'Penthouse',
  },
  {
    id: 12,
    name: 'Watch Tower Property 3',
    location: 'Watch Tower Center',
    rentAmount: 1500,
    notes: 'Rent taken by Dad',
  },
  // Arepally House Rents
  {
    id: 13,
    name: 'Arepally House 1',
    location: 'Arepally House Rents',
    rentAmount: 2000,
  },
  {
    id: 14,
    name: 'Arepally House 2',
    location: 'Arepally House Rents',
    rentAmount: 3000,
  },
  {
    id: 15,
    name: 'Old House',
    location: 'Arepally House Rents',
    rentAmount: 1800,
    notes: 'Old house',
  },
  {
    id: 16,
    name: 'Arepally House 3',
    location: 'Arepally House Rents',
    rentAmount: 3000,
  },
];

const locations = [
  'Arepally Chicken Center',
  'Gandhi Nagar',
  'Court',
  'Watch Tower Center',
  'Arepally House Rents',
];

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    // Load tenants from localStorage or use initial data
    const savedTenants = JSON.parse(localStorage.getItem('tenants'));
    if (savedTenants) {
      setTenants(savedTenants);
    } else {
      setTenants(initialTenants);
      // Save initial data to localStorage
      localStorage.setItem('tenants', JSON.stringify(initialTenants));
    }

    // Load payments from localStorage
    const savedPayments = JSON.parse(localStorage.getItem('payments')) || [];
    setPayments(savedPayments);

    // Set initial filter from navigation state
    if (location.state?.filterLocation) {
      setFilterLocation(location.state.filterLocation);
      // Clear the navigation state
      window.history.replaceState({}, document.title);
    }

    // Listen for localStorage changes
    const handleStorage = (event) => {
      if (event.key === 'payments') {
        const updatedPayments = JSON.parse(event.newValue) || [];
        setPayments(updatedPayments);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [location.state?.filterLocation]);

  const filteredTenants = tenants.filter(tenant => 
    !filterLocation || tenant.location === filterLocation
  );

  const totalRent = filteredTenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0);

  const isPaymentReceived = (propertyName) => {
    const payment = payments.find(p => p.propertyName === propertyName);
    return payment?.status === 'received';
  };

  const handleMarkAsReceived = (tenant) => {
    // Get existing payments
    let updatedPayments = [...payments];
    
    // Check if payment already exists
    const existingPayment = updatedPayments.find(p => p.propertyName === tenant.name);
    if (!existingPayment || existingPayment.status !== 'received') {
      updatedPayments.push({
        propertyName: tenant.name,
        status: 'received',
        timestamp: new Date().toISOString(),
      });

      // Save updated payments
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      setPayments(updatedPayments); // Update local state

      // Add a temporary success message
      const successMessage = document.createElement('div');
      successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${theme.palette.success.main};
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 1000;
      `;
      successMessage.textContent = 'Payment marked as received!';
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
      }, 2000);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 3,
        }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="600">
              Properties
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your properties and tenants
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/tenants/add')}
            sx={{
              px: 3,
              py: 1,
            }}
          >
            Add Property
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Total Monthly Rent: ₹{totalRent.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Rent Amount</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow
                key={tenant.id}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    opacity: 0.95,
                    transition: 'all 0.2s ease',
                  },
                  transition: 'all 0.2s ease',
                  backgroundColor: isPaymentReceived(tenant.name) 
                    ? theme.palette.success.light 
                    : 'transparent',
                }}
              >
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.location}</TableCell>
                <TableCell align="right">₹{tenant.rentAmount.toLocaleString()}</TableCell>
                <TableCell>
                  {tenant.notes && <Typography color="text.secondary">{tenant.notes}</Typography>}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={isPaymentReceived(tenant.name) ? 'Payment Received' : 'Mark as Received'}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsReceived(tenant);
                        }}
                        size="large"
                        sx={{
                          backgroundColor: isPaymentReceived(tenant.name) 
                            ? theme.palette.success.main 
                            : 'transparent',
                          color: isPaymentReceived(tenant.name) 
                            ? theme.palette.common.white 
                            : theme.palette.success.main,
                          '&:hover': {
                            backgroundColor: isPaymentReceived(tenant.name) 
                              ? theme.palette.success.dark 
                              : theme.palette.success.light,
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isPaymentReceived(tenant.name) ? <AttachMoneyIcon /> : <MoneyOffIcon />}
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tenants/${tenant.id}`);
                      }}
                      size="large"
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
