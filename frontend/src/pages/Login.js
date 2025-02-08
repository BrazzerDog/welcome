import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert, Box, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/all.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  padding: 0,
  maxWidth: '100% !important',
  width: '100%',
  margin: 0
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
  fontWeight: 'bold',
  borderRadius: '10px',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
  },
}));

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/welcome');
      }
    } catch (error) {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <Fade in timeout={1000}>
        <StyledPaper elevation={6}>
          <Box mb={4} textAlign="center">
            <img 
              src="/images/groot.jpg" 
              alt="Groot"
              style={{ 
                width: '150px',
                height: '150px',
                marginBottom: '1rem',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 'bold',
              }}
            >
              НейроКаскад
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              I am Groot! (Войдите в систему)
            </Typography>
          </Box>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2, 
                borderRadius: '10px',
                animation: 'shake 0.5s ease-in-out',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '25%': { transform: 'translateX(-10px)' },
                  '75%': { transform: 'translateX(10px)' },
                },
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Имя пользователя"
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              label="Пароль"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              variant="outlined"
            />
            <StyledButton
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
            >
              Войти в систему
            </StyledButton>
          </form>
        </StyledPaper>
      </Fade>
    </StyledContainer>
  );
}

export default Login; 