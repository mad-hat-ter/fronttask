
    import React from 'react';
    import { Card, CardMedia, CardContent, Typography, CardActionArea} from '@mui/material';
    import { type IMovie } from '../types';

    interface MovieCardProps {
      movie: IMovie;
      onClick: (movieId: number) => void;
    }

    export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {

      const imageUrl = movie.posterUrlPreview || 'https://via.placeholder.com/250x350?text=No+Image';

      return (
        <Card sx={{ maxWidth: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardActionArea onClick={() => onClick(movie.kinopoiskId)} sx={{ flexGrow: 1 }}>
            <CardMedia
              component="img"
              height="350"
              image={imageUrl}
              alt={movie.nameRu}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap>
                {movie.nameRu}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.year}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    };