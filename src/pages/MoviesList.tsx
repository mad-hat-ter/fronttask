
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { getTopMovies } from '../api/apiConfig';
import { MovieCard } from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import { type IMovie } from '../types';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        setLoading(true);
        const response = await getTopMovies();
        setMovies(response.data.items || []);
      } catch (err) {
        setError('Не удалось загрузить список фильмов.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Популярные фильмы
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', margin: '40px auto' }} />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid key={movie.kinopoiskId} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <MovieCard movie={movie} onClick={handleMovieClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MoviesList;
