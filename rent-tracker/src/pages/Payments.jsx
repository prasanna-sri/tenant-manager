import { useState, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  useTheme,
  Chip,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { TenantsContext } from './Tenants';
import { PaymentsContext } from '../contexts/PaymentsContext';

export default function Payments() {
  const theme = useTheme();
  const { tenants } = useContext(TenantsContext);
  const { payments, addPayment, updatePaymentStatus } = useContext(PaymentsContext);
  const [open, setOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    tenantId: '',
    amount: '',
    date: new Date(),
  });

  const handleAddPayment = () => {
    if (!newPayment.tenantId || !newPayment.amount || !newPayment.date) {
      return;
    }
    addPayment({
      ...newPayment,
      amount: Number(newPayment.amount),
      status: 'Pending',
      date: newPayment.date.toISOString().split('T')[0],
    });
    setOpen(false);
    setNewPayment({
      tenantId: '',
      amount: '',
      date: new Date(),
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTenantName = (tenantId) => {
    const tenant = tenants.find((t) => t.id === tenantId);
    return tenant ? tenant.name : 'Unknown Tenant';
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
            Payments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage rental payments
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Record Payment
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
              <TableCell sx={{ fontWeight: 600 }}>Tenant</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {getTenantName(payment.tenantId)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    ${payment.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(payment.date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status === 'Paid' ? 'success' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell align="right">
                  {payment.status === 'Pending' && (
                    <IconButton
                      color="success"
                      onClick={() => updatePaymentStatus(payment.id, 'Paid')}
                      size="small"
                      sx={{ 
                        backgroundColor: `${theme.palette.success.main}15`,
                        '&:hover': {
                          backgroundColor: `${theme.palette.success.main}25`,
                        },
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="600">
            Record New Payment
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important' }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tenant-select-label">Tenant</InputLabel>
            <Select
              labelId="tenant-select-label"
              value={newPayment.tenantId}
              label="Tenant"
              onChange={(e) => {
                const tenant = tenants.find((t) => t.id === e.target.value);
                setNewPayment({
                  ...newPayment,
                  tenantId: e.target.value,
                  amount: tenant ? tenant.rentAmount : '',
                });
              }}
            >
              {tenants.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name} - Unit {tenant.unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={newPayment.date}
              onChange={(newDate) =>
                setNewPayment({ ...newPayment, date: newDate })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setOpen(false)}
            startIcon={<CloseIcon />}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPayment}
            startIcon={<AddIcon />}
            sx={{
              px: 3,
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Add Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
