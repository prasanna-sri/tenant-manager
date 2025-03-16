import { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TenantsContext } from './Tenants';
import { PaymentsContext } from '../contexts/PaymentsContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { tenants } = useContext(TenantsContext);
  const { getTotalRevenue, getPendingPayments } = useContext(PaymentsContext);

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Mock data for demonstration
  }, []);

  const StatCard = ({ title, value, action }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="primary">
          {value}
        </Typography>
        {action && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={action.onClick}
          >
            {action.text}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Tenants"
            value={tenants.length}
            action={{
              text: 'View Tenants',
              onClick: () => navigate('/tenants'),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Pending Payments"
            value={getPendingPayments()}
            action={{
              text: 'View Payments',
              onClick: () => navigate('/payments'),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Revenue"
            value={`$${getTotalRevenue().toLocaleString()}`}
            action={{
              text: 'View Payments',
              onClick: () => navigate('/payments'),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
