import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(33,203,243,1) 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  borderRadius: '10px',
  textTransform: 'none',
  fontSize: '1rem',
  padding: theme.spacing(1, 2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Logo = styled('img')({
  height: '40px',
  marginRight: '10px',
});

function Navbar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Logo 
            src="https://www.pngmart.com/files/22/Groot-PNG-Isolated-HD.png" 
            alt="Groot"
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            НейроКаскад
          </Typography>
        </Box>
        <StyledButton color="inherit" component={Link} to="/">
          Главная
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/portfolio">
          Портфолио
        </StyledButton>
        <StyledButton color="inherit" component={Link} to="/system-load">
          Системные операции
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar; 