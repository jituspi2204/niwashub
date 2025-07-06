import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlatDetailsType } from '../types/flat.types';
import { act } from 'react';

export type LoadingState = { active: boolean; message: string };
export interface FlatState {
  activeFlatId: string;
  activeFlatDetails: FlatDetailsType | {} | null;
}

const initialState: FlatState = {
  activeFlatId: '',
  activeFlatDetails: {},
};

const flatSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setActiveFlat: (state, action: PayloadAction<FlatDetailsType>) => {
      state.activeFlatId = action.payload.flatId;
      state.activeFlatDetails = action.payload;
    },
  },
});
export const { setActiveFlat } = flatSlice.actions;
export default flatSlice.reducer;
