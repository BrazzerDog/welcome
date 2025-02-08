import React from 'react';
import { Container, Typography, Grid, Paper, Box, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/all.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  maxWidth: '100% !important',
  width: '100%',
  margin: 0
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ProjectCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '15px',
  background: 'rgba(255, 255, 255, 0.35)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
  },
}));

const projects = [
  {
    title: "Стражи данных",
    description: "Система защиты и анализа данных на базе квантовых алгоритмов",
    image: "/images/starlord.jpg"
  },
  {
    title: "Грут-анализатор",
    description: "ИИ система на базе древовидных алгоритмов с самообучением",
    image: "/images/groot.jpg"
  },
  {
    title: "Ракета-оптимизатор",
    description: "Высокоскоростная система обработки и оптимизации данных",
    image: "/images/rocket.jpg"
  },
  {
    title: "Drax-Destroyer",
    description: "Система очистки и уничтожения устаревших данных",
    image: "/images/drax.jpg"
  }
];

function Portfolio() {
  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={1000}>
        <StyledPaper elevation={6}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 'bold',
              marginBottom: 4
            }}
          >
            Портфолио проекта
          </Typography>
          
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ProjectCard elevation={3}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '300px',
                      objectFit: 'contain',
                      borderRadius: '10px',
                      marginBottom: '1rem',
                      background: 'rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {project.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {project.description}
                  </Typography>
                </ProjectCard>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Fade>
    </StyledContainer>
  );
}

export default Portfolio; 