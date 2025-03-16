import React, { useState, useEffect, useContext } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';

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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Tenants</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tenants/add')}
        >
          Add Tenant
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell align="right">Rent Amount</TableCell>
              <TableCell>Lease Start</TableCell>
              <TableCell>Lease End</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.unit}</TableCell>
                <TableCell align="right">${tenant.rentAmount}</TableCell>
                <TableCell>{tenant.leaseStart}</TableCell>
                <TableCell>{tenant.leaseEnd}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/tenants/${tenant.id}`)}
                  >
                    <ViewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
