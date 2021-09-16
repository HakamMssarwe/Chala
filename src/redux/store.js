import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './slices/AuthenticationSlice';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice
  }
});
