import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import loaderReducer from './Loader/loaderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
