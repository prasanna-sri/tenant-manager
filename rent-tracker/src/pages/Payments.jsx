import { useState, useContext } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TenantsContext } from './Tenants';
import { PaymentsContext } from '../contexts/PaymentsContext';

export default function Payments() {
  const { tenants } = useContext(TenantsContext);
  const { payments, addPayment, updatePaymentStatus } = useContext(PaymentsContext);
  const [filterMonth, setFilterMonth] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPayment, setNewPayment] = useState({
    tenantId: '',
    amount: '',
    date: null,
  });

  const handleAddPayment = () => {
    if (!newPayment.tenantId || !newPayment.amount || !newPayment.date) {
      return;
    }

    const selectedTenant = tenants.find(t => t.id === newPayment.tenantId);
    if (!selectedTenant) return;
    
    addPayment({
      ...newPayment,
      amount: Number(newPayment.amount),
      status: 'Pending',
      date: newPayment.date.toISOString().split('T')[0],
    });
    
    setNewPayment({
      tenantId: '',
      amount: '',
      date: null,
    });
    setOpenDialog(false);
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? tenant.name : 'Unknown';
  };

  const getTenantUnit = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? tenant.unit : 'Unknown';
  };

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const filteredPayments = payments.filter(payment => {
    if (!filterMonth) return true;
    const paymentDate = new Date(payment.date);
    return months[paymentDate.getMonth()] === filterMonth;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Payments</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setNewPayment({
                tenantId: '',
                amount: '',
                date: new Date(),
              });
              setOpenDialog(true);
            }}
          >
            Record Payment
          </Button>
        </Box>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{getTenantName(payment.tenantId)}</TableCell>
                <TableCell>{getTenantUnit(payment.tenantId)}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">${payment.amount.toLocaleString()}</TableCell>
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
                <TableCell>
                  {payment.status === 'Pending' && (
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => updatePaymentStatus(payment.id, 'Paid')}
                    >
                      Mark as Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record New Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tenant</InputLabel>
              <Select
                value={newPayment.tenantId}
                label="Tenant"
                onChange={(e) => {
                  const tenant = tenants.find(t => t.id === e.target.value);
                  setNewPayment(prev => ({
                    ...prev,
                    tenantId: e.target.value,
                    amount: tenant ? tenant.rentAmount : '',
                  }));
                }}
              >
                {tenants.map((tenant) => (
                  <MenuItem key={tenant.id} value={tenant.id}>
                    {tenant.name} - {tenant.unit} (${tenant.rentAmount})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={newPayment.amount}
              onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
              InputProps={{
                startAdornment: '$',
              }}
              required
            />
            <DatePicker
              label="Payment Date"
              value={newPayment.date}
              onChange={(newValue) => setNewPayment(prev => ({ ...prev, date: newValue }))}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddPayment} 
            variant="contained" 
            color="primary"
            disabled={!newPayment.tenantId || !newPayment.amount || !newPayment.date}
          >
            Add Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
