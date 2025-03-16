import React, { useState, useContext } from 'react';
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
  Box,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Create a context to share tenants data
export const TenantsContext = React.createContext();

export function TenantsProvider({ children }) {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'John Doe',
      unit: 'A101',
      rentAmount: 1200,
      leaseStart: '2025-01-01',
      leaseEnd: '2025-12-31',
    },
    {
      id: 2,
      name: 'Jane Smith',
      unit: 'B202',
      rentAmount: 1500,
      leaseStart: '2025-02-01',
      leaseEnd: '2026-01-31',
    },
  ]);

  const addTenant = (newTenant) => {
    setTenants(prev => [...prev, { ...newTenant, id: prev.length + 1 }]);
  };

  return (
    <TenantsContext.Provider value={{ tenants, addTenant }}>
      {children}
    </TenantsContext.Provider>
  );
}

export default function Tenants() {
  const { tenants } = useContext(TenantsContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getLeaseStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const monthsLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24 * 30));

    if (monthsLeft < 0) {
      return { label: 'Expired', color: 'error' };
    } else if (monthsLeft <= 2) {
      return { label: 'Expiring Soon', color: 'warning' };
    } else {
      return { label: 'Active', color: 'success' };
    }
  };

  return (
    <div>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="600">
            Tenants
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your property tenants and leases
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
          Add Tenant
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
              <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Rent Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Lease Period</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => {
              const leaseStatus = getLeaseStatus(tenant.leaseEnd);
              return (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {tenant.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tenant.unit}
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
                      ${tenant.rentAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={leaseStatus.label}
                      color={leaseStatus.color}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/tenants/${tenant.id}`)}
                      endIcon={<ArrowForwardIcon />}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
