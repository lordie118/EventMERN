import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const initialState = {
  connected: null,
};

const ConnectedSlice = createSlice({
  name: 'connected',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.connected = action.payload;
    },
    clearUser: (state) => {
      state.connected = null;
    },
  },
});

export const { setUser, clearUser } = ConnectedSlice.actions;

export const initializeUser = () => (dispatch) => {
  const token = localStorage.getItem('user_token');
  console.log('Token récupéré :', token); // Debug

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Token décodé :', decodedToken); // Debug

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        dispatch(setUser(decodedToken));
        console.log('Utilisateur connecté :', decodedToken); // Debug
      } else {
        localStorage.removeItem('token');
        dispatch(clearUser());
        console.log('Token expiré'); // Debug
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      localStorage.removeItem('token');
      dispatch(clearUser());
    }
  } else {
    console.log('Aucun token trouvé'); // Debug
    dispatch(clearUser());
  }
};



export default ConnectedSlice.reducer;