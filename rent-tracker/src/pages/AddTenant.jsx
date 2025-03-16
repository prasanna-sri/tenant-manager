import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TenantsContext } from './Tenants';

export default function AddTenant() {
  const navigate = useNavigate();
  const { addTenant } = useContext(TenantsContext);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    rentAmount: '',
    leaseStart: null,
    leaseEnd: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTenant({
      ...formData,
      leaseStart: formData.leaseStart?.toISOString().split('T')[0],
      leaseEnd: formData.leaseEnd?.toISOString().split('T')[0],
    });
    navigate('/tenants');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Tenant
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tenant Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Unit Number"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rent Amount"
                  name="rentAmount"
                  type="number"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: '$',
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Lease Start Date"
                  value={formData.leaseStart}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, leaseStart: newValue }))
                  }
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Lease End Date"
                  value={formData.leaseEnd}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, leaseEnd: newValue }))
                  }
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/tenants')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Tenant
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
