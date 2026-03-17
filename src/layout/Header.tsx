
import React, { useState } from 'react'; 
import {
  AppBar, Toolbar, Typography, Button, Box, Badge, Container,
  IconButton, Drawer, List, ListItemButton, ListItemText
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/MovieFilter';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const favoriteCount = useSelector((state: RootState) => state.favorites.length);
  const [mobileOpen, setMobileOpen] = useState(false); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getNavLinkStyle = (path: string) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#ffab00' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
    mx: 1, 
    '&:hover': {
      color: '#ffcdd2',
    },
  });


  const getDrawerItemStyle = (path: string) => ({
    color: location.pathname === path ? '#ffab00' : '#333', 
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#333' }}>
        KINO-POISK
      </Typography>
      <List>
        <ListItemButton onClick={() => navigate('/movies')}>
          <ListItemText primary="Список фильмов" sx={getDrawerItemStyle('/movies')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/search')}>
          <ListItemText primary="Поиск" sx={getDrawerItemStyle('/search')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/favorites')}>
          <ListItemText primary="Избранное" sx={getDrawerItemStyle('/favorites')} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1a1a1a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: '#ffab00' }} // Скрыть на md+
          >
            <MenuIcon />
          </IconButton>
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
              flexGrow: 1, 
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> 
            <Button component={NavLink} to="/movies" sx={getNavLinkStyle('/movies')}>
              Список фильмов
            </Button>
            <Button component={NavLink} to="/search" sx={getNavLinkStyle('/search')}>
              Поиск
            </Button>
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
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }, 
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
