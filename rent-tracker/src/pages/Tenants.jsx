import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Box,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';

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
    notes: '18 tenants',
  },
  {
    id: 4,
    name: 'Gandhi Nagar Property 3',
    location: 'Gandhi Nagar',
    rentAmount: 5500,
    notes: 'Verification needed',
  },
  {
    id: 5,
    name: 'Gandhi Nagar Property 4',
    location: 'Gandhi Nagar',
    rentAmount: 10000,
    notes: '1 tenant',
  },
  // Court Area
  {
    id: 6,
    name: 'Court Property 1',
    location: 'Court',
    rentAmount: 18500,
    notes: '5 tenants',
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
    notes: '10 tenants',
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

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setTenants(initialTenants);
  }, []);

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
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
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Add Property
        </Button>
      </Box>

      <TableContainer 
        component={Paper}
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          '& .MuiTableRow-root:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Rent Amount (₹)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {tenant.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tenant.location}
                    size="small"
                    sx={{ 
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    ₹{tenant.rentAmount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {tenant.notes}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/tenants/${tenant.id}`)}
                    startIcon={<ViewIcon />}
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
