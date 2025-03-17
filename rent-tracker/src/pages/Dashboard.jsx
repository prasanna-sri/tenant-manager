import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRent: 0,
    totalProperties: 0,
    locationStats: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate statistics from the tenant data
    const locations = {
      'Arepally Chicken Center': { total: 5500, count: 1 },
      'Gandhi Nagar': { total: 29000, count: 4 },
      'Court': { total: 20500, count: 2 },
      'Watch Tower Center': { total: 23000, count: 5 },
      'Arepally House Rents': { total: 9800, count: 4 }
    };

    const totalRent = Object.values(locations).reduce((sum, loc) => sum + loc.total, 0);
    const totalProperties = Object.values(locations).reduce((sum, loc) => sum + loc.count, 0);

    const locationStats = Object.entries(locations).map(([name, data]) => ({
      name,
      total: data.total,
      count: data.count
    }));

    setStats({
      totalRent,
      totalProperties,
      locationStats
    });
  }, []);

  const StatCard = ({ title, value, subValue, action }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="primary" gutterBottom>
          {value}
        </Typography>
        {subValue && (
          <Typography variant="body2" color="text.secondary">
            {subValue}
          </Typography>
        )}
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

  const LocationCard = ({ location }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {location.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="primary">
            ₹{location.total.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.count} {location.count === 1 ? 'property' : 'properties'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Total Monthly Rent"
            value={`₹${stats.totalRent.toLocaleString()}`}
            subValue={`From ${stats.totalProperties} properties`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            action={{
              text: 'View All Properties',
              onClick: () => navigate('/tenants'),
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Rent by Location
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {stats.locationStats.map((location) => (
          <Grid item xs={12} md={6} key={location.name}>
            <LocationCard location={location} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
