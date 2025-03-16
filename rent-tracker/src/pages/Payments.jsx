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
} from '@mui/material';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [filterMonth, setFilterMonth] = useState('');

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data for demonstration
    setPayments([
      {
        id: 1,
        tenantName: 'John Doe',
        unit: 'A101',
        date: '2025-01-01',
        amount: 1200,
        status: 'Paid',
      },
      {
        id: 2,
        tenantName: 'Jane Smith',
        unit: 'B202',
        date: '2025-01-01',
        amount: 1500,
        status: 'Pending',
      },
    ]);
  }, []);

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Payments</Typography>
        <TextField
          select
          label="Filter by Month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="">All Months</MenuItem>
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tenant</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.tenantName}</TableCell>
                <TableCell>{payment.unit}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell align="right">${payment.amount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color={payment.status === 'Paid' ? 'success' : 'warning'}
                    sx={{ minWidth: 100 }}
                  >
                    {payment.status}
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
