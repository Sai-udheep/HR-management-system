import { useAuth } from '../context/AuthContext';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">Welcome to Dashboard</Typography>
        <Typography variant="h6" mt={2}>Logged in as: {user?.email}</Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 4 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
