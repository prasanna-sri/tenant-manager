import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRent: 0,
    totalProperties: 0,
    pendingPayments: 0,
    receivedPayments: 0,
  });

  const locations = [
    {
      name: 'Arepally Chicken Center',
      properties: 1,
      totalRent: 5500,
    },
    {
      name: 'Gandhi Nagar',
      properties: 4,
      totalRent: 29000,
    },
    {
      name: 'Court',
      properties: 2,
      totalRent: 20500,
    },
    {
      name: 'Watch Tower Center',
      properties: 5,
      totalRent: 23000,
    },
    {
      name: 'Arepally House Rents',
      properties: 4,
      totalRent: 9800,
    },
  ];

  useEffect(() => {
    // Calculate total rent and properties
    const totalRent = locations.reduce((sum, loc) => sum + loc.totalRent, 0);
    const totalProperties = locations.reduce((sum, loc) => sum + loc.properties, 0);

    // Get payment statistics from localStorage
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const tenants = JSON.parse(localStorage.getItem('tenants')) || [];
    
    // Create a map of payments by property name
    const paymentStatusMap = payments.reduce((map, payment) => {
      map[payment.propertyName] = payment.status;
      return map;
    }, {});

    // Calculate pending and received amounts based on tenant data
    let pendingAmount = 0;
    let receivedAmount = 0;

    tenants.forEach(tenant => {
      const status = paymentStatusMap[tenant.name];
      if (status === 'received') {
        receivedAmount += tenant.rentAmount;
      } else {
        pendingAmount += tenant.rentAmount;
      }
    });

    setStats({
      totalRent,
      totalProperties,
      pendingPayments: pendingAmount,
      receivedPayments: receivedAmount,
    });
  }, []);

  const handleLocationClick = (location) => {
    navigate('/tenants', { state: { filterLocation: location } });
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={cardStyle}
            onClick={() => handleCardClick('/tenants')}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <TrendingUpIcon color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Total Monthly Rent
                </Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="600">
                ₹{stats.totalRent.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                From {stats.totalProperties} properties
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={cardStyle}
            onClick={() => handleCardClick('/payments')}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PaymentIcon color="success" />
                <Typography variant="h6" fontWeight="600">
                  Received
                </Typography>
              </Box>
              <Typography variant="h3" color="success.main" fontWeight="600">
                ₹{stats.receivedPayments.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={cardStyle}
            onClick={() => handleCardClick('/payments')}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PaymentIcon color="warning" />
                <Typography variant="h6" fontWeight="600">
                  Pending
                </Typography>
              </Box>
              <Typography variant="h3" color="warning.main" fontWeight="600">
                ₹{stats.pendingPayments.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={cardStyle}
            onClick={() => handleCardClick('/tenants')}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessIcon color="primary" />
                <Typography variant="h6" fontWeight="600">
                  Properties
                </Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="600">
                {stats.totalProperties}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across {locations.length} locations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="600">
          Rent by Location
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.name}>
            <Card 
              sx={cardStyle}
              onClick={() => handleLocationClick(location.name)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  {location.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Monthly Rent
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="600">
                      ₹{location.totalRent.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Properties
                    </Typography>
                    <Typography variant="h5" fontWeight="600">
                      {location.properties}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
