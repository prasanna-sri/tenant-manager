import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon } from '@mui/icons-material';

export default function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [payments, setPayments] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: null,
    amount: '',
    notes: '',
  });

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data for demonstration
    const mockProperties = [
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
      // Add more properties as needed
    ];

    const foundProperty = mockProperties.find(p => p.id === parseInt(id));
    setProperty(foundProperty);

    // Mock payment data
    setPayments([
      {
        id: 1,
        date: '2025-03-01',
        amount: foundProperty?.rentAmount || 0,
        status: 'Received',
        notes: 'March 2025 rent',
      },
      {
        id: 2,
        date: '2025-02-01',
        amount: foundProperty?.rentAmount || 0,
        status: 'Received',
        notes: 'February 2025 rent',
      },
    ]);
  }, [id]);

  const handleAddPayment = () => {
    const payment = {
      id: payments.length + 1,
      date: newPayment.date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      amount: parseFloat(newPayment.amount) || property?.rentAmount || 0,
      status: 'Received',
      notes: newPayment.notes,
    };

    setPayments([payment, ...payments]);
    setOpenPaymentDialog(false);
    setNewPayment({ date: null, amount: '', notes: '' });
  };

  if (!property) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Property Details</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/tenants')}
        >
          Back to Properties
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Property Name
                  </Typography>
                  <Typography variant="h6">{property.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="h6">{property.location}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Monthly Rent
                  </Typography>
                  <Typography variant="h6">₹{property.rentAmount.toLocaleString()}</Typography>
                </Grid>
                {property.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body1">{property.notes}</Typography>
                  </Grid>
                )}
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
              onClick={() => setOpenPaymentDialog(true)}
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
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>{payment.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
        <DialogTitle>Record New Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DatePicker
              label="Payment Date"
              value={newPayment.date}
              onChange={(newValue) => setNewPayment(prev => ({ ...prev, date: newValue }))}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newPayment.amount}
              onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
              InputProps={{
                startAdornment: '₹',
              }}
              placeholder={property.rentAmount.toString()}
            />
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={2}
              value={newPayment.notes}
              onChange={(e) => setNewPayment(prev => ({ ...prev, notes: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPayment} variant="contained" color="primary">
            Save Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
