import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean | null;
}

const initialState: AuthState = {
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<boolean | null>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthentication } = authSlice.actions;
export default authSlice.reducer;
