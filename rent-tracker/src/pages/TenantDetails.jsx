import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export default function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    // Get tenant data from localStorage or use initial data
    const savedTenants = JSON.parse(localStorage.getItem('tenants')) || initialTenants;
    const foundTenant = savedTenants.find(t => t.id === parseInt(id));
    setTenant(foundTenant || null);
  }, [id]);

  if (!tenant) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/tenants')}
          sx={{ mb: 3 }}
        >
          Back to Properties
        </Button>
        <Typography>Property not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/tenants')}
        sx={{ mb: 3 }}
      >
        Back to Properties
      </Button>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom fontWeight="600">
              {tenant.name}
            </Typography>
            <Chip
              label={tenant.location}
              size="small"
              sx={{
                backgroundColor: `${theme.palette.primary.main}15`,
                color: theme.palette.primary.main,
                fontWeight: 500,
                mb: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Monthly Rent
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="600">
                ₹{tenant.rentAmount.toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          {tenant.notes && (
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Due Date
                </Typography>
                <Typography variant="body1">
                  {tenant.notes}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

// Initial tenant data
const initialTenants = [
  {
    id: 1,
    name: 'Arepally Chicken Center',
    location: 'Arepally Chicken Center',
    rentAmount: 5500,
    notes: '',
  },
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
