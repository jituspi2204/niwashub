import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  loggedIn: Boolean;
  loading: Boolean;
  user: {} | null | undefined;
}

const initialState: ThemeState = {
  loggedIn: false,
  loading: true,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<any>) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser: state => {
      state.loggedIn = false;
      state.user = null;
      state.loading = false;
    },
  },
});
export const { logInUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
