
    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import {
      Box, Typography, Rating, Container, Button, CircularProgress, Grid, Link, Alert,
      Chip 
    } from '@mui/material';
    import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
    import FavoriteIcon from '@mui/icons-material/Favorite';
    import { useSelector, useDispatch } from 'react-redux';
    import { type RootState } from '../store';
    import { toggleFavorite } from '../store/favoritesSlice';
    import { getMovieDetails } from '../api/apiConfig';
    import { type IMovie } from '../types';

    const MovieDetailPage: React.FC = () => {
      const { id } = useParams<{ id: string }>(); 
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const favorites = useSelector((state: RootState) => state.favorites);

      const [movie, setMovie] = useState<IMovie | null>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const isFavorite = favorites.some(fav => fav.kinopoiskId === Number(id)); 

      useEffect(() => {
        const fetchMovie = async () => {
          if (!id) return;
          setLoading(true);
          setError(null);
          try {
            const response = await getMovieDetails(id);
            setMovie(response.data); 
          } catch (err) {
            setError('Не удалось загрузить информацию о фильме. Возможно, фильм не найден или проблемы с сетью.');
            console.error('Movie Detail API Error:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchMovie();
      }, [id]);

      const handleBack = () => {
        navigate(-1);
      };

      const handleToggleFavorite = () => {
        if (movie) {
          dispatch(toggleFavorite(movie));
        }
      };

      if (loading) return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
      if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
      if (!movie) return <Typography variant="h6" align="center" sx={{ mt: 4 }}>Фильм не найден.</Typography>;

      return (        
      <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <img
                src={movie.posterUrl || 'https://via.placeholder.com/600x900?text=No+Image'}
                alt={movie.nameRu}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.nameRu} ({movie.year})
              </Typography>
              {movie.nameEn && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Оригинальное название: {movie.nameEn}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mr: 1 }}>Рейтинг Кинопоиска:</Typography>
                <Rating
                  name="movie-rating-kinopoisk"
                  value={movie.ratingKinopoisk ? movie.ratingKinopoisk / 2 : 0}
                  readOnly
                  precision={0.1}
                  max={5}
                />
                <Typography variant="body1" sx={{ ml: 1 }}>{movie.ratingKinopoisk || 'N/A'}</Typography>
              </Box>
              {movie.ratingImdb && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>Рейтинг IMDb:</Typography>
                  <Rating
                    name="movie-rating-imdb"
                    value={movie.ratingImdb ? movie.ratingImdb / 2 : 0}
                    readOnly
                    precision={0.1}
                    max={5}
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>{movie.ratingImdb || 'N/A'}</Typography>
                </Box>
              )}

              <Typography variant="body1" paragraph sx={{ mt: 3 }}>
                {movie.description || 'Описание фильма отсутствует.'}
              </Typography>

              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>Жанры:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movie.genres.map((g, index) => (
                      <Chip key={index} label={g.genre} variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
              {movie.countries && movie.countries.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>Страны:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movie.countries.map((c, index) => (
                      <Chip key={index} label={c.country} variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
              {movie.filmLength && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Продолжительность: {movie.filmLength} мин.
                </Typography>
              )}


              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBack} size="large" sx={{ mr: 1 }} >
                  Назад
                </Button>
                <Button
                  variant="contained"
                  color={isFavorite ? 'error' : 'primary'}
                  onClick={handleToggleFavorite}
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  size="large"
                  sx={{ ml: 1 }}
                >
                  {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                </Button>
                {movie.webUrl && (
                  <Button
                    variant="text"
                    component={Link} 
                    href={movie.webUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    size="large"
                    sx={{ ml: 1, color: '#008cff' }}
                  >
                    На Кинопоиск
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      );
    };

    export default MovieDetailPage;
