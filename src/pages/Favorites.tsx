 
    import React from 'react';
    import { Container, Typography, Grid, Button } from '@mui/material';
    import { useSelector } from 'react-redux';
    import { type RootState } from '../store';
    import { MovieCard } from '../components/MovieCard';
    import { useNavigate } from 'react-router-dom';

    const FavoritesPage: React.FC = () => {
      const favorites = useSelector((state: RootState) => state.favorites);
      const navigate = useNavigate();

      const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
      };

      return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Избранные фильмы
          </Typography>

          {favorites.length === 0 ? (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
              У вас пока нет избранных фильмов. Найдите их через <Button onClick={() => navigate('/search')}>Поиск</Button>!
            </Typography>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {favorites.map((movie) => (
                <Grid key={movie.kinopoiskId} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <MovieCard movie={movie} onClick={handleMovieClick} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      );
    };

    export default FavoritesPage;
