import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import utilsReducer from '../reducers/utilssSlice';
import bootstrapReducer from '../reducers/bootstrapDataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer,
    bootstrapData: bootstrapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
