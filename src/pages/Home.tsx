
    import React from 'react';
    import { Box, Typography, Container, Button } from '@mui/material';
    import { useNavigate } from 'react-router-dom';

    const Home: React.FC = () => {
      const navigate = useNavigate();

      const handleExplore = () => {
        navigate('/search');
      };

      return (
        <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Приложение по сервису "Кинопоиск"
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Приложение для работы с базой данных серива Кинопоиск
          </Typography>
          <Button variant="contained" size="large" onClick={handleExplore}>
            Начать поиск
          </Button>

          <Box sx={{ mt: 8, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Возможности:
            </Typography>
            <ul>
              <li><Typography>Просмотр списка популярных фильмов</Typography></li>
              <li><Typography>Поиск фильмов</Typography></li>
              <li><Typography>Добавление в избранное</Typography></li>
              <li><Typography>Просмотр детальной информации о фильме</Typography></li>
            </ul>
          </Box>
        </Container>
      );
    };

    export default Home;