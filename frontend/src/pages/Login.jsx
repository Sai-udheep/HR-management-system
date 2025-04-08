import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        alert('Login successful');
        login(email);
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('Error connecting to backend');
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Typography variant="h6">Already logged in</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
