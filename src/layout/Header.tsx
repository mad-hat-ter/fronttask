
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Badge, Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/MovieFilter';

const Header: React.FC = () => {
  const location = useLocation();
  const favoriteCount = useSelector((state: RootState) => state.favorites.length);

  const getNavLinkStyle = (path: string) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#ffab00' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
    mx: 1, 
    '&:hover': {
      color: '#ffcdd2',
    },
  });

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1a1a1a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#ffab00' }} />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>


          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button component={NavLink} to="/" sx={getNavLinkStyle('/')}>
                Главная
            </Button>
            <Button component={NavLink} to="/movies" sx={getNavLinkStyle('/movies')}>
              Список фильмов
            </Button>
            <Button component={NavLink} to="/search" sx={getNavLinkStyle('/search')}>
              Поиск
            </Button>
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Button
              component={NavLink}
              to="/favorites"
              sx={getNavLinkStyle('/favorites')}
              startIcon={
                <Badge badgeContent={favoriteCount} color="error">
                  <FavoriteIcon />
                </Badge>
              }
            >
              Избранное
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
