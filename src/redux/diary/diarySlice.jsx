import { createSlice } from "@reduxjs/toolkit";
import { fetchDiaryConsumed, fetchRemoveProduct, fetchAllProducts } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        consumedProducts: [],
        isLoading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
           .addCase(fetchDiaryConsumed.pending, handlePending)
            .addCase(fetchDiaryConsumed.fulfilled, (state, action) => {
                state.consumedProducts = action.payload.entries || []; 
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchDiaryConsumed.rejected, handleRejected)
            .addCase(fetchRemoveProduct.pending, handlePending)
            .addCase(fetchRemoveProduct.fulfilled, (state, action) => {
                state.consumedProducts = action.payload; 
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchRemoveProduct.rejected, handleRejected)
            .addCase(fetchAllProducts.pending, handlePending)
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.consumedProducts = action.payload.consumedProducts || []; 
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, handleRejected);
    }
})

export const diaryReducer = diarySlice.reducer;