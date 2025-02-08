import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import SystemLoad from './pages/SystemLoad';
import Welcome from './pages/Welcome';

const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#f50057' },
  },
});

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/welcome" /> : <Login />
          } />
          <Route path="/welcome" element={
            isAuthenticated ? <Welcome /> : <Navigate to="/" />
          } />
          <Route path="/portfolio" element={
            isAuthenticated ? <Portfolio /> : <Navigate to="/" />
          } />
          <Route path="/system-load" element={
            isAuthenticated ? <SystemLoad /> : <Navigate to="/" />
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
