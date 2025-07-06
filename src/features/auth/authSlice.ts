import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  loggedIn: boolean;
  loading: boolean;
  loginToken: string;
  id: string;
  user: {} | null | undefined;
  newUser: boolean;
}

const initialState: ThemeState = {
  loggedIn: false,
  loginToken: '',
  id: '',
  loading: true,
  user: {},
  newUser: false,
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
    },
    logoutUser: state => {
      state.loggedIn = false;
      state.loginToken = '';
      state.id = '';
      state.user = null;
      state.loading = false;
    },
    setNewUser : (state , action : PayloadAction<boolean> ) => {
      state.newUser= action.payload;
    }
  },
});
export const { logInUser, logoutUser, setNewUser } = authSlice.actions;
export default authSlice.reducer;
