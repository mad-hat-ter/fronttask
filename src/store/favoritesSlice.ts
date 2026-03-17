   
    import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
    import { type IMovie } from '../types'; 


    const initialState: IMovie[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    const favoritesSlice = createSlice({
      name: 'favorites',
      initialState,
      reducers: {
        toggleFavorite: (state, action: PayloadAction<IMovie>) => {
          const index = state.findIndex(item => item.kinopoiskId === action.payload.kinopoiskId);
          if (index !== -1) {
            state.splice(index, 1);
          } else {
            state.push(action.payload);
          }
          localStorage.setItem('favorites', JSON.stringify(state));
        },
      },
    });

    export const { toggleFavorite } = favoritesSlice.actions;
    export default favoritesSlice.reducer;
