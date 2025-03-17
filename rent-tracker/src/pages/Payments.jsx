import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [stats, setStats] = useState({
    totalCollected: 0,
    pendingAmount: 0,
  });

  const locations = [
    'Arepally Chicken Center',
    'Gandhi Nagar',
    'Court',
    'Watch Tower Center',
    'Arepally House Rents',
  ];

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data for demonstration
    const mockPayments = [
      {
        id: 1,
        propertyName: 'Arepally Chicken Center',
        location: 'Arepally Chicken Center',
        date: '2025-03-01',
        amount: 5500,
        status: 'Received',
        notes: 'March 2025 rent',
      },
      {
        id: 2,
        propertyName: 'Gandhi Nagar Property 1',
        location: 'Gandhi Nagar',
        date: '2025-03-01',
        amount: 5500,
        status: 'Pending',
        notes: 'March 2025 rent',
      },
      {
        id: 3,
        propertyName: 'Court Property 1',
        location: 'Court',
        date: '2025-03-01',
        amount: 18500,
        status: 'Received',
        notes: 'March 2025 rent (5 tenants)',
      },
    ];

    setPayments(mockPayments);

    // Calculate statistics
    const collected = mockPayments
      .filter(p => p.status === 'Received')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pending = mockPayments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);

    setStats({
      totalCollected: collected,
      pendingAmount: pending,
    });
  }, []);

  const filteredPayments = payments.filter(payment => {
    if (filterLocation && payment.location !== filterLocation) {
      return false;
    }
    // Add month filtering if needed
    return true;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Rent Payments
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Collected This Month
              </Typography>
              <Typography variant="h4" color="primary">
                ₹{stats.totalCollected.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Amount
              </Typography>
              <Typography variant="h4" color="error">
                ₹{stats.pendingAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          select
          label="Filter by Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">All Locations</MenuItem>
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>
        <DatePicker
          views={['month', 'year']}
          label="Filter by Month"
          value={filterMonth}
          onChange={(newValue) => setFilterMonth(newValue)}
          slotProps={{ textField: { sx: { width: 200 } } }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.propertyName}</TableCell>
                <TableCell>
                  <Chip 
                    label={payment.location}
                    size="small"
                  />
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status === 'Received' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{payment.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
