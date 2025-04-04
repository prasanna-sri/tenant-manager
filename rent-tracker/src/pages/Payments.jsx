import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  useTheme,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, Edit as EditIcon, Cancel as CancelIcon } from '@mui/icons-material';

// Initialize payments based on tenant data
const initialPayments = [
  // Arepally Chicken Center
  {
    id: 1,
    propertyName: "Arepally Chicken Center",
    location: "Arepally Chicken Center",
    amount: 5500,
    dueDate: "5th of every month",
    status: "pending"
  },
  // Gandhi Nagar
  {
    id: 2,
    propertyName: "Gandhi Nagar Shop 1",
    location: "Gandhi Nagar",
    amount: 7000,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 3,
    propertyName: "Gandhi Nagar Shop 2",
    location: "Gandhi Nagar",
    amount: 8000,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 4,
    propertyName: "Gandhi Nagar Shop 3",
    location: "Gandhi Nagar",
    amount: 7000,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 5,
    propertyName: "Gandhi Nagar Shop 4",
    location: "Gandhi Nagar",
    amount: 7000,
    dueDate: "5th of every month",
    status: "pending"
  },
  // Court
  {
    id: 6,
    propertyName: "Court Shop 1",
    location: "Court",
    amount: 12500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 7,
    propertyName: "Court Shop 2",
    location: "Court",
    amount: 8000,
    dueDate: "5th of every month",
    status: "pending"
  },
  // Watch Tower Center
  {
    id: 8,
    propertyName: "Watch Tower Shop 1",
    location: "Watch Tower Center",
    amount: 4500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 9,
    propertyName: "Watch Tower Shop 2",
    location: "Watch Tower Center",
    amount: 4500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 10,
    propertyName: "Watch Tower Shop 3",
    location: "Watch Tower Center",
    amount: 4500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 11,
    propertyName: "Watch Tower Shop 4",
    location: "Watch Tower Center",
    amount: 4500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 12,
    propertyName: "Watch Tower Shop 5",
    location: "Watch Tower Center",
    amount: 5000,
    dueDate: "5th of every month",
    status: "pending"
  },
  // Arepally House Rents
  {
    id: 13,
    propertyName: "Arepally House 1",
    location: "Arepally House Rents",
    amount: 2500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 14,
    propertyName: "Arepally House 2",
    location: "Arepally House Rents",
    amount: 2500,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 15,
    propertyName: "Arepally House 3",
    location: "Arepally House Rents",
    amount: 2400,
    dueDate: "5th of every month",
    status: "pending"
  },
  {
    id: 16,
    propertyName: "Arepally House 4",
    location: "Arepally House Rents",
    amount: 2400,
    dueDate: "5th of every month",
    status: "pending"
  }
];

export default function Payments() {
  const theme = useTheme();
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Load payments from localStorage on component mount
  useEffect(() => {
    // Clear existing payments and set initial data
    localStorage.setItem('payments', JSON.stringify(initialPayments));
    setPayments(initialPayments);
  }, []);

  const handlePaymentReceived = (paymentId) => {
    const updatedPayments = payments.map(payment =>
      payment.id === paymentId
        ? { ...payment, status: payment.status === 'received' ? 'pending' : 'received' }
        : payment
    );
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingPayment(null);
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    const updatedPayments = payments.map(payment =>
      payment.id === editingPayment.id ? editingPayment : payment
    );
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    handleEditClose();
  };

  const handleEditFieldChange = (field, value) => {
    setEditingPayment(prev => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : value
    }));
  };

  // Calculate statistics
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalReceived = payments
    .filter(p => p.status === 'received')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Rent Payments
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Track and manage property rent payments
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, backgroundColor: `${theme.palette.success.main}15` }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Received
              </Typography>
              <Typography variant="h5" color="success.main" fontWeight="600">
                ₹{totalReceived.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, backgroundColor: `${theme.palette.warning.main}15` }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Pending
              </Typography>
              <Typography variant="h5" color="warning.main" fontWeight="600">
                ₹{totalPending.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Property</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {payment.propertyName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={payment.location}
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
                    ₹{payment.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {payment.dueDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={payment.status === 'received' ? 'Received' : 'Pending'}
                    size="small"
                    sx={{
                      backgroundColor: payment.status === 'received'
                        ? `${theme.palette.success.main}15`
                        : `${theme.palette.warning.main}15`,
                      color: payment.status === 'received'
                        ? theme.palette.success.main
                        : theme.palette.warning.main,
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant={payment.status === 'received' ? 'outlined' : 'contained'}
                      size="small"
                      color={payment.status === 'received' ? 'success' : 'primary'}
                      onClick={() => handlePaymentReceived(payment.id)}
                      startIcon={payment.status === 'received' ? <CheckCircleIcon /> : null}
                      sx={{
                        minWidth: 120,
                        ...(payment.status === 'received' && {
                          borderColor: theme.palette.success.main,
                          color: theme.palette.success.main,
                          '&:hover': {
                            borderColor: theme.palette.success.main,
                            backgroundColor: `${theme.palette.success.main}10`,
                          },
                        }),
                      }}
                    >
                      {payment.status === 'received' ? 'Received' : 'Mark Received'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(payment)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Payment Details</DialogTitle>
        <DialogContent>
          {editingPayment && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Property Name"
                value={editingPayment.propertyName}
                onChange={(e) => handleEditFieldChange('propertyName', e.target.value)}
                fullWidth
              />
              <TextField
                label="Location"
                value={editingPayment.location}
                onChange={(e) => handleEditFieldChange('location', e.target.value)}
                fullWidth
              />
              <TextField
                label="Amount"
                type="number"
                value={editingPayment.amount}
                onChange={(e) => handleEditFieldChange('amount', e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Typography>₹</Typography>
                }}
              />
              <TextField
                label="Due Date"
                value={editingPayment.dueDate}
                onChange={(e) => handleEditFieldChange('dueDate', e.target.value)}
                fullWidth
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
