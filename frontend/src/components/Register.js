import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Link,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../apiCalls/auth';
import '../styles/FormStyles.css';
const defaultTheme = createTheme();

const Register = () => {
  // State variables 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 

    try {
      // Call API register function
      await apiRegister(name, email, password);
      setLoading(false); 
      setError('Registration Success'); 
      navigate("/login"); 
    } catch (error) {
      setLoading(false); 
      setError(error.message); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="container">
          <Avatar sx={{ m: 1, bgcolor: '#f50057'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} className="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* Display error message if registration fails */}
            {error && <Typography className="error">{error}</Typography>}
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submitButton"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} 
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            {/* Link to login page */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" className="link" onClick={() => navigate('/login')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
