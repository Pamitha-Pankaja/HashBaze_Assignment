import React from 'react';
import { Typography, Button } from '@mui/material';
import useAuthStore from '../authStore/Store';

const HomePage = () => {

  //Import global sates from the store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    window.location.replace('/login');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.name : 'User'}!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;

