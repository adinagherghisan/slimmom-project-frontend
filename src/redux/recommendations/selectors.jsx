import { createSelector } from "@reduxjs/toolkit";
//Memorizam datele pentru a nu se reranda
export const selectorRecommendations = createSelector(
    (state) => state.recommendation.recommendations,
    (recommendations) => ({
        dailyCalories: recommendations.dailyCalories || 0,
        forbiddenProducts: recommendations.forbiddenProducts || []
    })
);

