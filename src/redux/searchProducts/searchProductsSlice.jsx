import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchProducts } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const searchProductsSlice = createSlice({
    name: 'search',
    initialState: {
        products: [],
        isLoading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchProducts.pending, handlePending)
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                console.log('Fetched Products:', action.payload);
                state.products = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchSearchProducts.rejected, handleRejected)
    }
});

export const searchProductsReducer = searchProductsSlice.reducer;