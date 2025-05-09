import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetCategory } from '../types/categories.ts';

export type LoadingState = { active: boolean; message: string };
export interface BootstrapData {
  budgetCategories: BudgetCategory[];
}

const initialState: BootstrapData = {
  budgetCategories: [],
};

const bootstrapDataSlice = createSlice({
  name: 'bootstrapData',
  initialState,
  reducers: {
    setBudgetCategories: (state, action: PayloadAction<BudgetCategory[]>) => {
      state.budgetCategories = action.payload;
    },
  },
});
export const { setBudgetCategories } = bootstrapDataSlice.actions;
export default bootstrapDataSlice.reducer;
