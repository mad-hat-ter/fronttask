
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header'; 
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MoviesList from './pages/MoviesList';
import MovieDetailPage from './pages/MovieDetail';
import FavoritesPage from './pages/Favorites';
import { CssBaseline,Typography, Container } from '@mui/material'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ffab00',
    },
    error: {
      main: '#f44336',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter basename="/fronttask/"> 
        <Header /> 
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="*" element={<Typography variant="h4" align="center" sx={{mt: 8}}>404 - Страница не найдена</Typography>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;