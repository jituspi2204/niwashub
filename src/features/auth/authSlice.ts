import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ThemeState {
  loggedIn: Boolean;
  loading: Boolean;
}

const initialState: ThemeState = {
  loggedIn: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<Boolean>) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
  },
});
export const {logInUser} = authSlice.actions;
export default authSlice.reducer;
