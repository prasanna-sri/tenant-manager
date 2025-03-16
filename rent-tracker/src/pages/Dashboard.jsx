import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTenants: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });
  const navigate = useNavigate();

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Mock data for demonstration
    setStats({
      totalTenants: 5,
      pendingPayments: 2,
      totalRevenue: 25000,
    });
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
            value={stats.totalTenants}
            action={{
              text: 'View Tenants',
              onClick: () => navigate('/tenants'),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            action={{
              text: 'View Payments',
              onClick: () => navigate('/payments'),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
          />
        </Grid>
      </Grid>
    </div>
  );
}
