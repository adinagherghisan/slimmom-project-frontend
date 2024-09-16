import { createSlice } from "@reduxjs/toolkit";
import { fetchSummeryData } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSummeryData.pending, handlePending)
            .addCase(fetchSummeryData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchSummeryData.rejected, handleRejected)
    }
});

export const summaryReducer = summarySlice.reducer;