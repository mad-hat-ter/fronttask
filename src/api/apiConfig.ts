
    import axios from 'axios';

    const KINOPOISK_API_KEY = '5878ff70-9df0-4237-8b05-a0cab88d828d';

    const api = axios.create({
      baseURL: 'https://kinopoiskapiunofficial.tech/api',
      headers: {
        'X-API-KEY': KINOPOISK_API_KEY,
        'Content-Type': 'application/json',
      },
    });


    export const getTopMovies = () => api.get('/v2.2/films/collections?type=TOP_POPULAR_ALL');


    export const getMovieDetails = (id: string) => api.get(`/v2.2/films/${id}`);


    export const searchMovies = (keyword: string) => api.get(`/v2.1/films/search-by-keyword?keyword=${keyword}`);
