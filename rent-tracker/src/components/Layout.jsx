import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tenants', icon: <PeopleIcon />, path: '/tenants' },
    { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
  ];

  const drawer = (
    <div>
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          minHeight: 64,
        }}
      >
        <HomeIcon sx={{ fontSize: 32 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Rent Tracker
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mb: 1,
                backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
                color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: isActive 
                    ? theme.palette.primary.light 
                    : theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
                minWidth: 40,
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32,
              bgcolor: theme.palette.primary.main,
              cursor: 'pointer',
            }}
          >
            A
          </Avatar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
