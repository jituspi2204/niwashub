import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bootstrapReducer from '../reducers/bootstrapDataSlice';
import flatReducer from '../reducers/flatSlice';
import utilsReducer from '../reducers/utilssSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer,
    bootstrapData: bootstrapReducer,
    flat: flatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
