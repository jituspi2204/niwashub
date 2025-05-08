import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LoadingState = {active: boolean; message: string;};
export interface UtilState {
    loading: LoadingState
}

const initialState: UtilState = {
    loading: {active: false, message: ''},
};

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<LoadingState>) => {
            state.loading = action.payload;
        },
    },
});
export const {setLoading} = utilsSlice.actions;
export default utilsSlice.reducer;
