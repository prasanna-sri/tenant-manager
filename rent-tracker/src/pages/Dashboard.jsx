import { useContext } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TenantsContext } from './Tenants';
import { PaymentsContext } from '../contexts/PaymentsContext';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { tenants } = useContext(TenantsContext);
  const { getTotalRevenue, getPendingPayments } = useContext(PaymentsContext);

  const stats = [
    {
      title: 'Total Tenants',
      value: tenants.length,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      iconColor: theme.palette.primary.main,
      action: {
        text: 'View Tenants',
        onClick: () => navigate('/tenants'),
      },
    },
    {
      title: 'Pending Payments',
      value: getPendingPayments(),
      icon: <PaymentIcon sx={{ fontSize: 40 }} />,
      iconColor: theme.palette.warning.main,
      action: {
        text: 'View Payments',
        onClick: () => navigate('/payments'),
      },
    },
    {
      title: 'Total Revenue',
      value: `$${getTotalRevenue().toLocaleString()}`,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      iconColor: theme.palette.success.main,
      action: {
        text: 'View Payments',
        onClick: () => navigate('/payments'),
      },
    },
  ];

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your rental property management
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.title}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${stat.iconColor}15`,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.iconColor,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ ml: 'auto' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={stat.action.onClick}
                      sx={{
                        borderColor: stat.iconColor,
                        color: stat.iconColor,
                        '&:hover': {
                          borderColor: stat.iconColor,
                          backgroundColor: `${stat.iconColor}10`,
                        },
                      }}
                    >
                      {stat.action.text}
                    </Button>
                  </Box>
                </Box>
                <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
