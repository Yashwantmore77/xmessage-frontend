// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk'; // Import thunk middleware
import authReducer, { AuthState } from './Auth/authSlice'; // Import your auth slice

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as unknown as ThunkMiddleware<{ auth: AuthState }>), // Use getDefaultMiddleware and concat redux-thunk
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
