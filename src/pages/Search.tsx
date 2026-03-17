
    import React, { useState, useEffect } from 'react';
    import { TextField,  CircularProgress, Grid, Typography, Container, Alert } from '@mui/material';
    import { useDebounce } from '../hooks/useDebounce'; 
    import { searchMovies } from '../api/apiConfig';
    import { MovieCard } from '../components/MovieCard';
    import { useNavigate } from 'react-router-dom';
    import { type IMovie } from '../types';

    const SearchPage: React.FC = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const debouncedSearchTerm = useDebounce(searchTerm, 500); 
      const [movies, setMovies] = useState<IMovie[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchMovies = async () => {
          if (debouncedSearchTerm.trim()) {
            setLoading(true);
            setError(null);
            try {
              const response = await searchMovies(debouncedSearchTerm);
              setMovies(response.data.films || []);
            } catch (err) {
              setError('Не удалось загрузить фильмы. Проверьте подключение или попробуйте позже.');
              console.error('Search API Error:', err);
            } finally {
              setLoading(false);
            }
          } else {
            setMovies([]);
          }
        };

        fetchMovies();
      }, [debouncedSearchTerm]); 

      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };

      const handleMovieClick = (id: number) => {
        if (id) {
          navigate(`/movie/${id}`);
        }
      };

      return (
        <Container maxWidth="lg">
          <TextField
            label="Поиск по названию фильма"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 3 }}
          />

          {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}
          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
          {!loading && !error && movies.length === 0 && debouncedSearchTerm.trim() && (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              По вашему запросу "{searchTerm}" ничего не найдено.
            </Typography>
          )}

        <Grid container spacing={3} justifyContent="center">
          {movies.map((movie) => {
            const movieId = movie.kinopoiskId || movie.filmId; 
    
           return (
             <Grid key={movieId} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
               <MovieCard 
                  movie={movie} 
                 onClick={() => movieId && handleMovieClick(movieId)} 
               />
             </Grid>
            );
          })}
        </Grid>
        </Container>
      );
    };

    export default SearchPage;