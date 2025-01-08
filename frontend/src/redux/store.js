import {configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import userReducer from './slices/userSlice';
const store = configureStore({
   reducer : {
      users: userReducer,
   },
   middleware : (getDefaultMiddleware) =>getDefaultMiddleware().concat(thunk),
})

export default store;