export interface IMovie {
  kinopoiskId: number;
  imdbId?: string; 
  nameRu: string;
  nameEn?: string;
  posterUrl?: string;
  posterUrlPreview: string;
  year: number;
  filmId?: number;
  filmLength?: number; 
  description?: string; 
  ratingKinopoisk?: number; 
  ratingImdb?: number;
  webUrl?: string; 
  genres?: { genre: string }[]; 
  countries?: { country: string }[]; 

}
