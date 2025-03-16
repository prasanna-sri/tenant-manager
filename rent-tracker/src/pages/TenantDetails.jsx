import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function TenantDetails() {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [payments, setPayments] = useState([]);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data for demonstration
    setTenant({
      id: parseInt(id),
      name: 'John Doe',
      unit: 'A101',
      rentAmount: 1200,
      leaseStart: '2025-01-01',
      leaseEnd: '2025-12-31',
    });

    setPayments([
      {
        id: 1,
        date: '2025-01-01',
        amount: 1200,
        status: 'Paid',
      },
      {
        id: 2,
        date: '2025-02-01',
        amount: 1200,
        status: 'Paid',
      },
    ]);
  }, [id]);

  if (!tenant) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tenant Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name
                  </Typography>
                  <Typography variant="h6">{tenant.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Unit
                  </Typography>
                  <Typography variant="h6">{tenant.unit}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Rent Amount
                  </Typography>
                  <Typography variant="h6">${tenant.rentAmount}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Lease Period
                  </Typography>
                  <Typography variant="h6">
                    {tenant.leaseStart} to {tenant.leaseEnd}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Payment History</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Record Payment
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell align="right">${payment.amount}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
