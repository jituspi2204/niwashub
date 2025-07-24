import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlatDetailsType } from '../types/flat.types';
import { act } from 'react';
import { FlatTypes } from '../types';

export type LoadingState = { active: boolean; message: string };
export interface FlatState {
  activeFlatId: string;
  activeFlatDetails: FlatDetailsType | {} | null;
  flatList: FlatTypes.FlatDetailsType[];
}

const initialState: FlatState = {
  activeFlatId: '',
  activeFlatDetails: {},
  flatList: [],
};

const flatSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setActiveFlatId: (state, action: PayloadAction<string>) => {
      state.activeFlatId = action.payload;
    },
    setActiveFlat: (state, action: PayloadAction<FlatDetailsType>) => {
      state.activeFlatId = action.payload.flatId;
      state.activeFlatDetails = action.payload;
    },
    setFlatList: (
      state,
      action: PayloadAction<FlatTypes.FlatDetailsType[]>,
    ) => {
      let firstFlat = action.payload[0];
      state.flatList = action.payload;
      state.activeFlatId = firstFlat.flatId;
      state.activeFlatDetails = firstFlat;
    },
  },
});
export const { setActiveFlat, setFlatList, setActiveFlatId } =
  flatSlice.actions;
export default flatSlice.reducer;
