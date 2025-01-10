import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';
import connectedReducer from './slices/ConnectedSlice';

const store = configureStore({
   reducer: {
      users: userReducer,
      events: eventReducer,
      connected : connectedReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;