import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicRecommendations, fetchPrivateRecommendations } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const recommendationsSlice = createSlice({
    name: 'recommendation',
    initialState: {
        recommendations: {},
        isLoading: false,
        error: null,
        userData: {
            height: 0,
            age: 0,
            current_weight: 0,
            desired_weight: 0,
            blood_type: ""
        }
    },
    reducers: {
        addHeight: (state, action) => {
            state.userData.height = action.payload;
        },
        addAge: (state, action) => {
            state.userData.age = action.payload;
        },
        addCurrentWeight: (state, action) => {
            state.userData.current_weight = action.payload;
        },
        addDesiredWeight: (state, action) => {
            state.userData.desired_weight = action.payload;
        },
        addBloodType: (state, action) => {
            state.userData.blood_type = action.payload;
        },
        clearForm: (state) => {
            state.userData.height = 0;
            state.userData.age = 0;
            state.userData.current_weight = 0;
            state.userData.desired_weight = 0;
            state.userData.blood_type = '';
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicRecommendations.pending, handlePending)
            .addCase(fetchPublicRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recommendations = action.payload;
                state.error = null;
            })
            .addCase(fetchPublicRecommendations.rejected, handleRejected)
            .addCase(fetchPrivateRecommendations.pending, handlePending)
            .addCase(fetchPrivateRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recommendations = action.payload;
                state.error = null;
            })
            .addCase(fetchPrivateRecommendations.rejected, handleRejected);
    }
});

export const { addHeight, addAge, addCurrentWeight, addDesiredWeight, addBloodType, clearForm } = recommendationsSlice.actions;
export const recommendationReducer = recommendationsSlice.reducer;