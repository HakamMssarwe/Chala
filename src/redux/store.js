import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './slices/AppSlice';

export const store = configureStore({
  reducer: {
    app: AppSlice
  }
});
