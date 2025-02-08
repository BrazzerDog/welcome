import React from 'react';
import { Container, Paper, Typography, Box, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

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

function Welcome() {
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
              Добро пожаловать в НейроКаскад!
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              I am Groot! (Система успешно активирована)
            </Typography>
          </Box>
        </StyledPaper>
      </Fade>
    </StyledContainer>
  );
}

export default Welcome; 