import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import utilsReducer from '../reducers/utilssSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
      utils : utilsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
