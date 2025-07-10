import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  loggedIn: boolean;
  loading: boolean;
  loginToken: string;
  id: string;
  user: {} | null | undefined;
  newUser: boolean;
  role: 'GUARD' | 'RESIDENT' | 'ADMIN' | null | undefined;
}

const initialState: ThemeState = {
  loggedIn: false,
  loginToken: '',
  id: '',
  loading: true,
  user: {},
  newUser: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<any>) => {
      state.loggedIn = action.payload.loggedIn;
      state.loginToken = action.payload.loginToken;
      state.user = action.payload.user;
      state.id = action.payload.id;
      state.loading = false;
      state.newUser = action.payload.newUser ? true : false;
      state.role = action.payload.role;
    },
    logoutUser: state => {
      state.loggedIn = false;
      state.loginToken = '';
      state.id = '';
      state.user = null;
      state.loading = false;
      state.role = null;
    },
    setNewUser: (state, action: PayloadAction<boolean>) => {
      state.newUser = action.payload;
    },
    setUserRole: (
      state,
      action: PayloadAction<'RESIDENT' | 'ADMIN' | 'GUARD'>,
    ) => {
      state.role = action.payload;
    },
  },
});
export const { logInUser, logoutUser, setNewUser, setUserRole } =
  authSlice.actions;
export default authSlice.reducer;
